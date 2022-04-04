package server

import (
	"errors"
	"log"
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
	}

	db, err := sql.New(dsn)
	if err != nil {
		log.Fatalf("tiny-todo failed to connect to SQLite: %s\n", err)
	}

	srv.Env = env.New(db)

	routes.Version(srv.Env, srv.Fiber.Group("/api/version"))

	srv.Fiber.Use("/", filesystem.New(filesystem.Config{
		Root:       http.FS(frontend.Static),
		PathPrefix: "dist",
	}))

	return srv
}

func (s *Server) Listen(addr string) {
	go func() {
		log.Printf("tiny-todo server now listening on %s\n", addr)

		if err := s.Fiber.Listen(addr); err != nil && errors.Is(err, http.ErrServerClosed) {
			log.Println("tiny-todo server closed")
		}
	}()

	quit := make(chan os.Signal)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down tiny-todo server...")

	if err := s.Fiber.Shutdown(); err != nil {
		log.Fatalf("An error occurred during shutdown: %s\n", err)
	}
}
