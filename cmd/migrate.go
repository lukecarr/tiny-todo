package cmd

import (
	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/lukecarr/x/stringsx"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

func MakeMigrateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "migrate <DSN>",
		Short: "Performs tiny-todo's SQLite database migrations",
		Run: func(cmd *cobra.Command, args []string) {
			if len(args) != 1 {
				log.Fatal().Str("Hint", "./tiny-todo migrate <DSN>").Msg("Please supply an SQLite connection string as a CLI argument!")
			}

			n, err := db.Migrate(args[0])

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
