package db

import (
	"log"

	"github.com/pocketbase/pocketbase"
)

func ConnectToDatabase() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
