package env

import (
	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/tiny-todo/internal/services"
)

type Env struct {
	DB       *db.DB
	Services struct {
		Task services.TaskService
	}
}

func New(db *db.DB) *Env {
	env := &Env{
		DB: db,
	}

	env.Services.Task = services.TaskServiceSql{Sqlx: db.Sqlx}

	return env
}
