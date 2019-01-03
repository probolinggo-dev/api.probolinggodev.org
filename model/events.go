package model

import (
	time "time"

	"github.com/jinzhu/gorm"
)

// Event :
type Event struct {
	gorm.Model
	Slug        string
	DateStart   *time.Time
	DateEnd     *time.Time
	Title       string
	Description string `sql:"type:text;"`
	Link        string
	Latitude    string
	Longitude   string
}
