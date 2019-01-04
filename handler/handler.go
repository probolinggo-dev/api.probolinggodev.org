package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

// Loader :
func Loader(_db *gorm.DB) *gin.Engine {
	// connect to db
	var err error
	db = _db
	if err != nil {
		panic(err)
	}
	return createRoutes()
}
