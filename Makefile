build-frontend:
	pnpm --dir frontend build

build:
	make build-frontend && go build -o bin/tiny-todo main.go

run:
	make build-frontend && go run main.go serve