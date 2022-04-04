package cmd

import (
	"github.com/lukecarr/tiny-todo/internal/db"
	"github.com/spf13/cobra"
)

func MakeMigrateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "migrate",
		Short: "Performs tiny-todo's SQLite database migrations",
		Run: func(cmd *cobra.Command, args []string) {
			n, err := db.Migrate(args[0])

			if err != nil {
				cmd.PrintErrf("%s\n", err)
			} else if n == 0 {
				cmd.Println("The provided SQLite database is already up to date!")
			} else {
				cmd.Printf("Applied %d migrations successfully!\n", n)
			}
		},
	}
}

var migrateCmd = MakeMigrateCmd()

func init() {
	rootCmd.AddCommand(migrateCmd)
}
