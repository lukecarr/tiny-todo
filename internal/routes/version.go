package routes

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lukecarr/tiny-todo/internal/env"
	"github.com/lukecarr/tiny-todo/internal/info"
)

func Version(e *env.Env, r fiber.Router) {
	r.Get("/", func(c *fiber.Ctx) error {
		date := info.Date
		if date == "undefined" {
			date = time.Now().Format(time.RFC3339)
		}

		return c.JSON(fiber.Map{
			"version": info.Version,
			"date":    date,
			"commit":  info.Commit,
		})
	})
}
