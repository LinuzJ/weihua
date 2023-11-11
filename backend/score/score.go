package score

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func GetScore() string {
	yoloServerUrl := "http://127.0.0.1:5000/yolo_model"

	response, err := http.Get(yoloServerUrl)
	if err != nil {
		fmt.Println("Error making GET request:", err)
		return err.Error()
	}
	defer response.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return err.Error()
	}

	// Print the response body as a string
	resp := string(body)
	return resp
}
