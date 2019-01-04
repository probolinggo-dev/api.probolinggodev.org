package handler

import (
	"github.com/gin-gonic/gin"
)

func createRoutes() *gin.Engine {
	router := gin.Default()

	rEvent := router.Group("events")
	{
		rEvent.GET("/", getEvents)
		rEvent.GET("/:id", getEvent)
		rEvent.POST("/", createEvent)
		rEvent.PUT("/:id", updateEvent)
		rEvent.DELETE("/:id", deleteEvent)
	}

	return router
}
