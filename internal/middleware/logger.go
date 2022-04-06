package middleware

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
)

func Logger() func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		start := time.Now()
		c.Next()

		log.Trace().
			Interface("ID", c.Locals("requestid")).
			Int("Status", c.Response().StatusCode()).
			Str("Method", c.Method()).
			Str("Path", c.Path()).
			Str("Time", fmt.Sprintf("%.3fms", float64(time.Since(start).Nanoseconds())/float64(time.Millisecond))).
			Send()

		return nil
	}
}
