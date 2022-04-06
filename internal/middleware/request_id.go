package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/fiber/v2/utils"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

func RequestID() func(c *fiber.Ctx) error {
	return requestid.New(requestid.Config{
		Generator: func() string {
			id, err := gonanoid.New()

			if err != nil {
				// Fallback to UUID on error
				return utils.UUID()
			}

			return id
		},
	})
}
