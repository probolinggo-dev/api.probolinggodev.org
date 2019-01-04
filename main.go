package main

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/probolinggo-dev/api.probolinggodev.org/config"
	"github.com/probolinggo-dev/api.probolinggodev.org/handler"
	"github.com/probolinggo-dev/api.probolinggodev.org/migration"
)

func main() {
	// read setting
	dbsettings, err := config.LoadDBSettings()
	if err != nil {
		fmt.Println(err)
		panic(err)
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
		panic(err)
	}

	migration.Migrate(db)
	router := handler.Loader(db)
	router.Run()
}
