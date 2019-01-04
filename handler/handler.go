package handler

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/probolinggo-dev/api.probolinggodev.org/config"
)

var db *gorm.DB

// Loader :
func Loader() *gin.Engine {
	// read setting
	dbsettings, err := config.LoadDBSettings()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	// connect to db
	db, err = gorm.Open("mysql",
		dbsettings.User+":"+
			dbsettings.Password+"@tcp("+
			dbsettings.Host+":"+
			dbsettings.Port+
			")/"+dbsettings.DBName+
			"?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	return createRoutes()
}
