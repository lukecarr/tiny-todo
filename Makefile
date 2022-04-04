build-frontend:
	cd frontend && pnpm build

build:
	go build -o bin/tiny-todo main.go

run:
	make build-frontend && go run main.go serve