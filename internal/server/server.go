package server

import (
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/lukecarr/tiny-todo/frontend"
	sql "github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/tiny-todo/internal/env"
	"github.com/lukecarr/tiny-todo/internal/routes"
	"github.com/rs/zerolog/log"
)

type Server struct {
	Fiber *fiber.App
	Env   *env.Env
}

func newFiber() *fiber.App {
	f := fiber.New(fiber.Config{
		AppName:               "tiny-todo",
		DisableStartupMessage: true,
	})
	return f
}

func New(dsn string) *Server {
	srv := &Server{
		Fiber: newFiber(),
		Env:   env.New(),
	}

	if dsn == "" {
		// In-memory mode
		log.Warn().
			Str("Hint", "SQLITE_DB=todo.db ./tiny-todo serve").
			Msg("Launching in in-memory mode as 'SQLITE_DB' environment variable wasn't set. Data will be lost on shutdown!")

		srv.Env.Services = env.NewInMemoryServices()
	} else {
		db, err := sql.New(dsn)

		if err != nil {
			log.Fatal().Err(err).Msg("Couldn't establish connection with SQLite!")
		}

		srv.Env.Services = env.NewSqlServices(db)
	}

	routes.Version(srv.Env, srv.Fiber.Group("/api/version"))
	routes.Task(srv.Env, srv.Fiber.Group("/api/tasks"))

	srv.Fiber.Use("/", filesystem.New(filesystem.Config{
		Root:       http.FS(frontend.Static),
		PathPrefix: "dist",
	}))

	return srv
}

func (s *Server) Listen(addr string) {
	go func() {
		log.Info().Str("Addr", addr).Msg("Server now listening!")

		if err := s.Fiber.Listen(addr); err != nil && errors.Is(err, http.ErrServerClosed) {
			log.Info().Msg("Server closed.")
		}
	}()

	quit := make(chan os.Signal)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info().Msg("Shutting down server...")

	if err := s.Fiber.Shutdown(); err != nil {
		log.Fatal().Err(err).Msg("Encountered an error during shutdown!")
	}
}
