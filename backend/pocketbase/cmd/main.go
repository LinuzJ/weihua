package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type Comparison struct {
	comparison1, comparison2 string
}

func main() {
	app := pocketbase.New()

	app.OnRecordAfterCreateRequest("videos").Add(func(e *core.RecordCreateEvent) error {
		videoFile := e.Record.Get("video").(string)

		go infer(app, e.Record, videoFile)

		return nil
	})

	app.OnRecordAfterUpdateRequest("videos").Add(func(e *core.RecordUpdateEvent) error {
		infer := e.Record.Get("infer")
		if infer == nil {
			return nil
		}

		log.Printf("calculating score for video: %s", e.Record.Id)

		reqBody, err := json.Marshal(Comparison{
			comparison1: infer.(string),
			comparison2: infer.(string),
		})
		if err != nil {
			return fmt.Errorf("comparison to json: %v", err)
		}

		res, err := http.Post("http://127.0.0.1:5000/compare", "application/json", bytes.NewBuffer(reqBody))
		if err != nil {
			return fmt.Errorf("comparison: %v", err)
		}
		defer res.Body.Close()

		scoreRecords, err := app.Dao().FindRecordsByFilter(
			"scores",
			"video = {:video}",
			"",
			1,
			0,
			dbx.Params{"video": e.Record.Id},
		)

		body, _ := io.ReadAll(res.Body)

		scoreRecord := scoreRecords[0]
		scoreRecord.Set("score", body)
		if err := app.Dao().SaveRecord(scoreRecord); err != nil {
			return fmt.Errorf("saving score: %v", err)
		}

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func infer(app *pocketbase.PocketBase, record *models.Record, fileName string) {
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
}
