package handler

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/probolinggo-dev/api.probolinggodev.org/model"
)

// GetEvents :
func getEvents(c *gin.Context) {

	var events []model.Event
	if err := db.Find(&events).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, events)
	}

}
