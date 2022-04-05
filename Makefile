build-frontend:
	pnpm --dir frontend build

build-backend:
	go build -o bin/tiny-todo main.go

run:
	make build-frontend && go run main.go serve

run-prod:
	make build-frontend && make build-backend && ./bin/tiny-todo serve