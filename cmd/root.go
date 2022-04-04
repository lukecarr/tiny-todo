package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func MakeRootCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "tiny-todo",
		Short: "Run and manage tiny-todo",
	}
}

var rootCmd = MakeRootCmd()

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		if _, err = fmt.Fprintln(os.Stderr, err); err != nil {
			panic(err.Error())
		}

		os.Exit(1)
	}
}
