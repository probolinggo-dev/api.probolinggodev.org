package migration

import (
	"fmt"

	"github.com/jinzhu/gorm"

	"github.com/probolinggo-dev/api.probolinggodev.org/model"
)

func Migrate(db *gorm.DB) {
	fmt.Println("Migrating database...")

	db.AutoMigrate(&model.Event{})

	fmt.Println("Migrating database is done!")
}
