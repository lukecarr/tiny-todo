package services

import (
	"github.com/jmoiron/sqlx"
	"github.com/lukecarr/tiny-todo/internal/models"
)

type TaskService interface {
	GetAll() ([]*models.Task, error)
	GetIncomplete() ([]*models.Task, error)
	GetComplete() ([]*models.Task, error)
	Create(name string) (*models.Task, error)
}

type TaskServiceSql struct {
	Sqlx *sqlx.DB
}

func (s TaskServiceSql) GetAll() ([]*models.Task, error) {
	tasks := make([]*models.Task, 0)
	err := s.Sqlx.Select(&tasks, "SELECT * FROM \"task\"")

	return tasks, err
}

func (s TaskServiceSql) GetIncomplete() ([]*models.Task, error) {
	tasks := make([]*models.Task, 0)
	err := s.Sqlx.Select(&tasks, "SELECT * FROM \"task\" WHERE \"task\".\"complete\" = 0")

	return tasks, err
}

func (s TaskServiceSql) GetComplete() ([]*models.Task, error) {
	tasks := make([]*models.Task, 0)
	err := s.Sqlx.Select(&tasks, "SELECT * FROM \"task\" WHERE \"task\".\"complete\" = 1")

	return tasks, err
}

func (s TaskServiceSql) Create(name string) (*models.Task, error) {
	task := &models.Task{}
	err := s.Sqlx.Get(task, "INSERT INTO \"task\" (\"name\") VALUES ($1) RETURNING *", name)
	return task, err
}
