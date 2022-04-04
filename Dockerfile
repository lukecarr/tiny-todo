FROM node:16.14.2 AS node-builder

RUN npm i -g pnpm@6.32.3

WORKDIR /build
COPY ./frontend ./

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM golang:1.18-alpine AS go-builder

RUN apk update && apk add --no-cache git ca-certificates tzdata build-base && update-ca-certificates

ENV USER=tiny
ENV UID=10001

RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "${UID}" \
  "${USER}"

WORKDIR $GOPATH/src/github.com/lukecarr/tiny-todo
COPY go.mod .

ENV GO111MODULE=on
RUN go mod download
RUN go mod verify

COPY . .
COPY --from=node-builder /build/dist ./frontend/dist/

ENV CGO_ENABLED=1
ENV GOOS=linux
ENV GOARCH=amd64
RUN go build -ldflags='-w -s -extldflags "-static"' -a -o /usr/bin/tiny-todo main.go

FROM scratch

COPY --from=go-builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=go-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=go-builder /etc/passwd /etc/passwd
COPY --from=go-builder /etc/group /etc/group

COPY --from=go-builder /usr/bin/tiny-todo /usr/bin/tiny-todo

EXPOSE 3000

USER tiny

ENTRYPOINT ["tiny-todo"]
CMD ["serve"]
