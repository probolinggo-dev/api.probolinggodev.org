package migration

import (
	"fmt"

	"github.com/jinzhu/gorm"

	"github.com/probolinggo-dev/api.probolinggodev.org/config"
	"github.com/probolinggo-dev/api.probolinggodev.org/model"
)

// Migrate :
func Migrate() {
	dbsettings, err := config.LoadDBSettings()
	if err != nil {
		fmt.Println(err)
		return
	}

	db, err := gorm.Open("mysql",
		dbsettings.User+":"+
			dbsettings.Password+"@tcp("+
			dbsettings.Host+":"+
			dbsettings.Port+
			")/"+dbsettings.DBName+
			"?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Migrating database...")

	db.AutoMigrate(&model.Event{})

	fmt.Println("Migrating database is done!")
}
