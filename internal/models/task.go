package models

type Task struct {
	Id       uint   `json:"id" db:"id"`
	Name     string `json:"name" db:"name"`
	Complete bool   `json:"complete" db:"complete"`
}
