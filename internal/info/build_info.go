package info

import "time"

var (
	Version = "dev build"
	Date    = time.Now().Format(time.RFC3339)
	Commit  = "0000000"
)
