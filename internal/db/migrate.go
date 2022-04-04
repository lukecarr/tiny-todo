package db

import (
	"embed"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
	migrate "github.com/rubenv/sql-migrate"
)

var migrations embed.FS

func Migrate(dsn string) (int, error) {
	conn, err := sqlx.Connect("sqlite3", dsn)

	if err != nil {
		return 0, err
	}

	defer func() {
		if conn != nil {
			if err := conn.Close(); err != nil {
				log.Fatalf("%s\n", err)
			}
		}
	}()

	migrations := &migrate.EmbedFileSystemMigrationSource{
		FileSystem: migrations,
		Root:       "migrations",
	}

	return migrate.Exec(conn.DB, "sqlite3", migrations, migrate.Up)
}
