package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"runtime"
)

func loadConfig(path string) (string, error) {
	return "", nil
}

// Config :
type Config struct {
	Database Database `json:"database"`
}

// Database :
type Database struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	DBName   string `json:"dbname"`
}

// LoadDBSettings : load setting database
func LoadDBSettings() (db Database, err error) {
	// load setting database dari binaryfile/../config.json
	_, filename, _, _ := runtime.Caller(1)
	filepath := path.Join(path.Dir(filename), "/config.json")
	jsonFile, err := os.Open(filepath)
	defer jsonFile.Close()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	// close file

	// convert jsonFile ke byteArray
	byteVal, _ := ioutil.ReadAll(jsonFile)

	// convert byteArray ke variable Config
	var config Config
	json.Unmarshal(byteVal, &config)
	db = config.Database
	fmt.Println(db)
	return
}
