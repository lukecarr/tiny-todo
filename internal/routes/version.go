package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lukecarr/tiny-todo/internal/env"
	"github.com/lukecarr/tiny-todo/internal/info"
)

func Version(e *env.Env, r fiber.Router) {
	r.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"version": info.Version,
		})
	})
}
