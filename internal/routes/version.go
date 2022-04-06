package routes

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lukecarr/tiny-todo/internal/env"
	"github.com/lukecarr/tiny-todo/internal/info"
)

func Version(e *env.Env, r fiber.Router) {
	r.Get("/", func(c *fiber.Ctx) error {
		resp := fiber.Map{}

		if info.Version != "undefined" {
			resp["version"] = info.Version
		}

		date := info.Date
		if date == "undefined" {
			date = time.Now().Format(time.RFC3339)
		}
		resp["date"] = date

		if info.Commit != "undefined" {
			resp["commit"] = info.Commit
		}

		return c.JSON(resp)
	})
}
