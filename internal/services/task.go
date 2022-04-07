package services

import "github.com/lukecarr/tiny-todo/internal/models"

type TaskService interface {
	GetAll() ([]*models.Task, error)
	GetIncomplete() ([]*models.Task, error)
	GetComplete() ([]*models.Task, error)
	Create(name string) (*models.Task, error)
}
