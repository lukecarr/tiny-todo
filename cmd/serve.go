package cmd

import (
	"github.com/lukecarr/tiny-todo/internal/server"
	"github.com/moducate/x/osx"
	"github.com/spf13/cobra"
)

func MakeServeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Serves tiny-todo's server",
		Run: func(cmd *cobra.Command, args []string) {
			srv := server.New("")
			srv.Listen(osx.Getenv("TINY_TODO_ADDR", ":3000"))
		},
	}
}

var serveCmd = MakeServeCmd()

func init() {
	rootCmd.AddCommand(serveCmd)
}
