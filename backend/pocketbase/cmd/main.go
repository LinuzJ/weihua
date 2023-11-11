package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"io"
	"log"
	"net/http"
)

type Comparison struct {
	Comparison1 string
	Comparison2 string
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

func inferAndScore(app *pocketbase.PocketBase, record *models.Record, fileName string) {
	log.Printf("creating infer for video: %s\n", record.Id)

	inferUrl := fmt.Sprintf("http://127.0.0.1:5000/infer?video=http://127.0.0.1:8080/api/files/videos/%s/%s", record.Id, fileName)
	response, err := http.Get(inferUrl)
	if err != nil {
		fmt.Printf("Error making GET request: %v\n", err)
		return
	}
	defer response.Body.Close()

	// Read the response body
	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Printf("Error reading response body: %v\n", err)
		return
	}

	record.Set("infer", body)
	if err := app.Dao().SaveRecord(record); err != nil {
		log.Printf("failed to save error %v\n", err)
	}
	log.Printf("saved infer for: %s", record.Id)

	log.Printf("calculating score for video: %s", record.Id)
	reqBody, err := json.Marshal(Comparison{
		Comparison1: string(body),
		Comparison2: string(body),
	})
	if err != nil {
		log.Printf("comparison to json failed: %v", err)
		return
	}

	log.Printf("sending comparison payload: %s", reqBody)

	res, err := http.Post("http://127.0.0.1:5000/compare", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		log.Printf("comparison failed: %v", err)
		return
	}
	defer res.Body.Close()

	body, _ = io.ReadAll(res.Body)
	log.Printf("got score %s for %s", body, record.Id)
	record.Set("score", body)

	if err := app.Dao().SaveRecord(record); err != nil {
		log.Printf("saving score failed: %v", err)
		return
	}
}
