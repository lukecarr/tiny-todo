package main

import (
	"database/sql"

	"github.com/lukecarr/tiny-todo/cmd"
	"github.com/lukecarr/x/osx"
	"github.com/mattn/go-colorable"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"modernc.org/sqlite"
)

func main() {
	sql.Register("sqlite3", &sqlite.Driver{})
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	stdout := colorable.NewColorableStdout()
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: stdout})

	logLevelEnv := osx.Getenv("LOG_LEVEL", "info")
	logLevel, err := zerolog.ParseLevel(logLevelEnv)
	if err != nil {
		log.Fatal().
			Str("Expected", "One of: panic, fatal, error, warn, info, debug, or trace").
			Str("Got", logLevelEnv).
			Msg("Please specify a valid logging level!")
	}

	log.Logger = log.Logger.Level(logLevel)

	cmd.Execute()
}
