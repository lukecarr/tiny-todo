package db

import (
	"database/sql"
	"embed"
	"log"

	migrate "github.com/rubenv/sql-migrate"
)

//go:embed migrations/*.sql
var migrations embed.FS

func Migrate(dsn string) (int, error) {

	conn, err := sql.Open(DIALECT, dsn)

	if err != nil {
		return 0, err
	}

	defer func() {
		if conn != nil {
			if err := conn.Close(); err != nil {
				log.Fatalf("Error encountered closing database connection: %s\n", err)
			}
		}
	}()

	migrations := &migrate.EmbedFileSystemMigrationSource{
		FileSystem: migrations,
		Root:       "migrations",
	}

	return migrate.Exec(conn, DIALECT, migrations, migrate.Up)
}
