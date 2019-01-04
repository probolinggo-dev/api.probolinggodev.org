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
func getEvent(c *gin.Context) {
	var event model.Event
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&event).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, event)
	}
}

func createEvent(c *gin.Context) {
	var event model.Event
	c.BindJSON(&event)
	db.Create(&event)
	c.JSON(200, event)
}

func updateEvent(c *gin.Context) {
	var event model.Event
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&event).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&event)
	db.Save(&event)
	c.JSON(200, event)
}
func deleteEvent(c *gin.Context) {
	id := c.Params.ByName("id")
	var event model.Event
	d := db.Where("id = ?", id).Delete(&event)
	fmt.Println(d)
	c.JSON(200, gin.H{"Eventid#" + id: "is deleted"})
}
