# tiny-todo

[![Latest release](https://img.shields.io/github/v/release/lukecarr/tiny-todo?label=latest)](https://github.com/lukecarr/tiny-todo/releases/latest)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/lukecarr/tiny-todo/Release)](https://github.com/lukecarr/tiny-todo/actions/workflows/release.yml)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/lukecarr/tiny-todo)](https://codeclimate.com/github/lukecarr/tiny-todo/maintainability)
![Scrutinizer quality](https://img.shields.io/scrutinizer/quality/g/lukecarr/tiny-todo)
![Snyk.io vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/lukecarr/tiny-todo)
[![Matrix](https://img.shields.io/matrix/tiny-todo:matrix.org)](https://matrix.to/#/#tiny-todo:matrix.org)
[![License](https://img.shields.io/github/license/lukecarr/tiny-todo)](https://github.com/lukecarr/tiny-todo/blob/main/LICENSE)
[![Open issues](https://img.shields.io/github/issues-raw/lukecarr/tiny-todo)](https://github.com/lukecarr/tiny-todo/issues?q=is%3Aopen+is%3Aissue)

> A powerful task-management tapp (tiny-app), built using Go and Preact.

* 👆 **Single zero-dependency executable.** Following the philosophy of tapps, tiny-todo ships as a single executable with zero dependencies!
* 💪 **Fast and lightweight.** Designed with performance in mind, targeting subsecond response times.

## Installation

Because tiny-todo ships as a single zero-dependency executable, installation is as simple as downloading the latest binary from our [releases page](https://github.com/lukecarr/tiny-todo/releases) for your system of choice.

### Docker

We also support Docker as a source for installing and running tiny-todo!

```bash
docker run -d -p 3000:3000 ghcr.io/lukecarr/tiny-todo:latest
```

You can find a list of all image tags [here](https://github.com/lukecarr/tiny-todo/pkgs/container/tiny-todo/versions).

## CLI

### `serve`

This starts the tiny-todo server.

By default, the server will listen on `:3000`; this can be changed by setting the `ADDR` environment variable.

> You might see a warning about "Launching in in-memory mode" when running this command. Please read [Data persistence](#data-persistence) for more information.

### `migrate`

This performs the necessary SQLite migrations.

When running this command, you must set the `SQLITE_DB` environment variable to the path of an SQLite `.db` file (it will be created if missing).

## Data persistence

**By default, tiny-todo launches in an "in-memory mode", where data does not persist across restarts.**

You should set the `SQLITE_DB` environment variable to the path of an SQLite `.db` file (it will be automatically created if missing) so tiny-todo can store persistent data.

### Warning message

To ensure that you're aware of tiny-todo's data persistence behaviour, a warning message will be logged on startup if you haven't set the `SQLITE_DB` environment variable:

```txt
11:44AM WRN Launching in in-memory mode as 'SQLITE_DB' environment variable wasn't set. Data will be lost on shutdown! Hint="SQLITE_DB=todo.db ./tiny-todo serve"
```

## Examples

We curate a multitude of examples for running tiny-todo in the [examples directory](examples)!

## Screenshot

![Screenshot](https://user-images.githubusercontent.com/24438483/162187159-0ca6fdb3-7d03-4533-9731-9f1375462212.png)

## License

tiny-todo is distributed under the [Apache 2.0](LICENSE) license.
