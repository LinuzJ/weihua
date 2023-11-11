package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type Comparison struct {
	Frames1 string `json:"frames1"`
	Frames2 string `json:"frames2"`
}

func main() {
	app := pocketbase.New()

	app.OnRecordAfterCreateRequest("videos").Add(func(e *core.RecordCreateEvent) error {
		videoFile := e.Record.Get("video").(string)
		go inferAndScore(app, e.Record, videoFile)
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func inferAndScore(app *pocketbase.PocketBase, video *models.Record, fileName string) {
	log.Printf("creating infer for video: %s\n", video.Id)

	inferUrl := fmt.Sprintf("http://127.0.0.1:5000/infer?video=http://127.0.0.1:8080/api/files/videos/%s/%s", video.Id, fileName)
	response, err := http.Get(inferUrl)
	if err != nil {
		fmt.Printf("Error making GET request to %s %s: %v\n", inferUrl, video.Id, err)
		return
	}
	defer response.Body.Close()

	// Read the response body
	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Printf("Error reading response body %s: %v\n", video.Id, err)
		return
	}

	video.Set("infer", body)
	if err := app.Dao().SaveRecord(video); err != nil {
		log.Printf("failed to save infer for %s %v\n", video.Id, err)
	}
	log.Printf("saved infer for: %s", video.Id)

	log.Printf("calculating score for video: %s", video.Id)
	reqBody, err := json.Marshal(Comparison{
		Frames1: string(body),
		Frames2: string(body),
	})
	if err != nil {
		log.Printf("comparison to json failed %s: %v\n", video.Id, err)
		return
	}

	res, err := http.Post("http://127.0.0.1:5000/compare", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		log.Printf("comparison failed: %v\n", err)
		return
	}
	defer res.Body.Close()

	body, _ = io.ReadAll(res.Body)
	log.Printf("got score %s for %s", body, video.Id)

	score, _ := strconv.ParseFloat(string(body), 32)
	if err != nil {
		log.Printf("failed to parse score %s for %s\n", body, video.Id)
	}
	video.Set("score", score)
	if err := app.Dao().SaveRecord(video); err != nil {
		log.Printf("saving score failed for %s: %v\n", video.Id, err)
		return
	}
}
