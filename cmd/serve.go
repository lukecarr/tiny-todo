package cmd

import (
	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/tiny-todo/internal/server"
	"github.com/lukecarr/x/osx"
	"github.com/spf13/cobra"
)

func MakeServeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Starts tiny-todo's server",
		Run: func(cmd *cobra.Command, args []string) {
			srv := server.New(osx.Getenv("SQLITE_DB", db.MEMORY_DSN))
			srv.Listen(osx.Getenv("ADDR", ":3000"))
		},
	}
}

var serveCmd = MakeServeCmd()

func init() {
	rootCmd.AddCommand(serveCmd)
}
