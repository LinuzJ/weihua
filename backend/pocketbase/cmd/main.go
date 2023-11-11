package main

import (
	"log"
	"net/http"

	"github.com/LinuzJ/weihua/score"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/api/weihua/score", func(c echo.Context) error {

			// Figure out where video is
			// Get reference score

			// GetScore
			score := score.GetScore()

			return c.String(http.StatusOK, score)
		}, apis.ActivityLogger(app))
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
