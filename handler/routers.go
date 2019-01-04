package handler

import (
	"github.com/gin-gonic/gin"
)

func createRoutes() *gin.Engine {
	router := gin.Default()

	rEvent := router.Group("events")
	{
		rEvent.GET("/", getEvents)
	}
	return router
}
