package env

import (
	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/tiny-todo/internal/services"
)

type Services struct {
	Task services.TaskService
}

type Env struct {
	Services *Services
}

func New() *Env {
	return &Env{}
}

func NewSqlServices(db *db.DB) *Services {
	return &Services{
		Task: services.TaskServiceSql{Sqlx: db.Sqlx},
	}
}
