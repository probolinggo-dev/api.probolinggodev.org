package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/probolinggo-dev/api.probolinggodev.org/config"
)

func main() {
	dbsettings, err := config.LoadDBSettings()
	if err != nil {
		fmt.Println(err)
		return
	}

	_ = dbsettings

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello",
		})
	})

	router.Run()
}
