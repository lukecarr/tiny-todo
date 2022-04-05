package main

import (
	"database/sql"

	"github.com/lukecarr/tiny-todo/cmd"
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

	cmd.Execute()
}
