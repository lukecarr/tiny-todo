package services

import "github.com/lukecarr/tiny-todo/internal/models"

type TaskService interface {
	GetAll() ([]*models.Task, error)
	Create(name string) (*models.Task, error)
}
