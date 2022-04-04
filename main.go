package main

import (
	"embed"

	"github.com/lukecarr/tiny-todo/cmd"
)

//go:embed frontend/dist
var Static embed.FS

func main() {
	cmd.Execute()
}
