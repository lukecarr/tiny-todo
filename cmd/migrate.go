package cmd

import (
	"database/sql"

	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/x/osx"
	"github.com/lukecarr/x/stringsx"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

func MakeMigrateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "migrate",
		Short: "Performs tiny-todo's SQLite database migrations",
		Run: func(cmd *cobra.Command, args []string) {
			dsn := osx.Getenv("SQLITE_DB", "")

			if dsn == "" {
				log.Fatal().Str("Hint", "SQLITE_DB=tiny-todo.db ./tiny-todo migrate").Msg("Please supply an SQLite database path as an environment variable (SQLITE_DB)!")
			}

			conn, err := sql.Open("sqlite3", dsn)

			if err != nil {
				log.Fatal().Err(err).Msg("Failed to open SQLite connection!")
			}

			n, err := db.Migrate(conn)

			if err != nil {
				log.Fatal().Err(err).Msg("Could not perform migrations on database!")
			} else if n == 0 {
				log.Warn().Msg("The provided SQLite database is already up to date!")
			} else {
				log.Info().Msgf("Applied %d %s successfully!", n, stringsx.Plural("migration", n))
			}
		},
	}
}

var migrateCmd = MakeMigrateCmd()

func init() {
	rootCmd.AddCommand(migrateCmd)
}
