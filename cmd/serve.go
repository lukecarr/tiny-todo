package cmd

import (
	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/tiny-todo/internal/server"
	"github.com/lukecarr/x/osx"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

func MakeServeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Starts tiny-todo's server",
		Run: func(cmd *cobra.Command, args []string) {
			dsn := osx.Getenv("SQLITE_DB", "")

			if dsn == db.MEMORY_DSN {
				if _, err := db.Migrate(dsn); err != nil {
					log.Fatal().Err(err).Msg("Failed to perform migrations on in-memory database!")
				}
			}

			srv := server.New(dsn)
			srv.Listen(osx.Getenv("ADDR", ":3000"))
		},
	}
}

var serveCmd = MakeServeCmd()

func init() {
	rootCmd.AddCommand(serveCmd)
}
