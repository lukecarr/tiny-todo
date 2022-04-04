package env

import "github.com/lukecarr/tiny-todo/internal/db"

type Env struct {
	DB *db.DB
}

func New(db *db.DB) *Env {
	env := &Env{
		DB: db,
	}

	return env
}
