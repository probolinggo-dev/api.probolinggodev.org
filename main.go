package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/probolinggo-dev/api.probolinggodev.org/config"
)

func main() {
	dbsettings, err := config.LoadDBSettings()
	if err != nil {
		fmt.Println(err)
		return
	}

	db, err := gorm.Open("mysql",
		dbsettings.User+":"+
			dbsettings.Password+"@"+
			dbsettings.Host+":"+
			dbsettings.Port+
			"/"+dbsettings.DBName+
			"?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello",
		})
	})

	router.Run()
}
