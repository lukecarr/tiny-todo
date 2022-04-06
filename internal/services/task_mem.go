package services

import "github.com/lukecarr/tiny-todo/internal/models"

type TaskServiceInMemory struct {
	Counter uint
	Tasks   []*models.Task
}

func (s TaskServiceInMemory) GetAll() ([]*models.Task, error) {
	return s.Tasks, nil
}

func (s *TaskServiceInMemory) Create(name string) (*models.Task, error) {
	s.Counter += 1

	task := &models.Task{
		Id:       s.Counter,
		Name:     name,
		Complete: false,
	}

	s.Tasks = append(s.Tasks, task)

	return task, nil
}
