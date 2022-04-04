package db

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	Sqlx *sqlx.DB
}

func New(dsn string) (*DB, error) {
	conn, err := sqlx.Connect("sqlite3", dsn)

	if err != nil {
		return nil, err
	}

	return &DB{
		Sqlx: conn,
	}, nil
}
