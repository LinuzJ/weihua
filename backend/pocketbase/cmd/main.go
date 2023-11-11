package main

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func main() {
	app := pocketbase.New()

	app.OnRecordAfterCreateRequest("videos").Add(func(e *core.RecordCreateEvent) error {
		videoFile := e.Record.Get("video").(string)

		go getScore(app, e.Record, videoFile)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func getScore(app *pocketbase.PocketBase, record *models.Record, fileName string) {
	log.Printf("creating score for video, %s\n", record.Id)

	yoloServerUrl := fmt.Sprintf("http://127.0.0.1:5000/infer?video=http://127.0.0.1:8080/api/files/videos/%s/%s", record.Id, fileName)

	response, err := http.Get(yoloServerUrl)
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
	// form-data with frames1 and frames2
	// yoloCompare := "http://127.0.0.1:5000/compare"
}
