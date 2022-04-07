package services

import "github.com/lukecarr/tiny-todo/internal/models"

type TaskServiceInMemory struct {
	Counter uint
	Tasks   []*models.Task
}

func (s TaskServiceInMemory) GetAll() ([]*models.Task, error) {
	return s.Tasks, nil
}

func (s TaskServiceInMemory) GetFiltered(fn func(*models.Task) bool) []*models.Task {
	tasks := make([]*models.Task, len(s.Tasks))

	for _, task := range s.Tasks {
		if fn(task) {
			tasks = append(tasks, task)
		}
	}

	return tasks
}

func (s TaskServiceInMemory) GetIncomplete() ([]*models.Task, error) {
	filtered := s.GetFiltered(func(t *models.Task) bool {
		return !t.Complete
	})

	return filtered, nil
}

func (s TaskServiceInMemory) GetComplete() ([]*models.Task, error) {
	filtered := s.GetFiltered(func(t *models.Task) bool {
		return t.Complete
	})

	return filtered, nil
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
