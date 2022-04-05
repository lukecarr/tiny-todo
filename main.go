package main

import (
	"database/sql"
	"os"

	"github.com/lukecarr/tiny-todo/cmd"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"modernc.org/sqlite"
)

func main() {
	sql.Register("sqlite3", &sqlite.Driver{})
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stdout})

	cmd.Execute()
}
