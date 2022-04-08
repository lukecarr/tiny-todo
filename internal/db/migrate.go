package db

import (
	"database/sql"
	"embed"

	migrate "github.com/rubenv/sql-migrate"
)

//go:embed migrations/*.sql
var migrations embed.FS

func Migrate(conn *sql.DB) (int, error) {
	migrations := &migrate.EmbedFileSystemMigrationSource{
		FileSystem: migrations,
		Root:       "migrations",
	}

	return migrate.Exec(conn, DIALECT, migrations, migrate.Up)
}
