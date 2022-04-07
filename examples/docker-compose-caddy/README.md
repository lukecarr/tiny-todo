# Docker Compose & Caddy

> This example demonstrates running tiny-todo with [Docker Compose](https://docs.docker.com/compose/), using [Caddy](https://caddyserver.com/) to serve as a reverse proxy and TLS terminator.

## Requirements

* Docker 1.13.0+

## Getting Started

Download the [docker-compose.yml](docker-compose.yml) configuration file and pass it to `docker-compose`:

```bash
DOMAIN=example.com docker-compose -f /path/to/docker-compose.yml up -d
```

Make sure to set the `DOMAIN` environment variable to the domain you'd like to serve tiny-todo on. Caddy will automatically provision HTTPS certificates!

> The `-d` flag is passed to docker-compose so the containers are started in the background (detached).

🎉 **You now have tiny-todo running on ports 80 and 443, serving HTTPS traffic to your provided domain!**
