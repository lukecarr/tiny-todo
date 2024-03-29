package routes

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/lukecarr/tiny-todo/internal/env"
	"github.com/rs/zerolog/log"
)

func Task(e *env.Env, r fiber.Router) {
	r.Get("/", getAllTasks(e))
	r.Post("/", createTask(e))

	r.Get("/:id", getTask(e))

	r.Get("/incomplete", getIncomplete(e))

	r.Get("/complete", getComplete(e))
}

func getTask(e *env.Env) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		param := c.Params("id")
		id, err := strconv.Atoi(param)

		if err != nil {
			return err
		}

		task, err := e.Services.Task.Get(id)

		if err != nil {
			log.Error().Err(err).Send()
			return err
		}

		if task == nil {
			return c.SendStatus(404)
		}

		return c.JSON(task)
	}
}

func getAllTasks(e *env.Env) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		tasks, err := e.Services.Task.GetAll()

		if err != nil {
			return err
		}

		return c.JSON(fiber.Map{
			"tasks": tasks,
		})
	}
}

func getComplete(e *env.Env) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		tasks, err := e.Services.Task.GetComplete()

		if err != nil {
			return err
		}

		return c.JSON(fiber.Map{
			"tasks": tasks,
		})
	}
}

func getIncomplete(e *env.Env) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		tasks, err := e.Services.Task.GetIncomplete()

		if err != nil {
			return err
		}

		return c.JSON(fiber.Map{
			"tasks": tasks,
		})
	}
}

type CreateTaskBody struct {
	Name string `json:"name"`
}

func createTask(e *env.Env) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		body := &CreateTaskBody{}
		if err := c.BodyParser(body); err != nil {
			return err
		}

		task, err := e.Services.Task.Create(body.Name)
		if err != nil {
			return err
		}

		log.Debug().Uint("ID", task.Id).Msg("Created new task!")

		return c.JSON(task)
	}
}
