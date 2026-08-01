---
title: "Personal GoLang Goal"
date: 2026-07-03
description: "Learning plan for GoLang"
tags:
  - GoLang
layout: layouts/post.njk
permalink: "/posts/{{ page.fileSlug }}/"
draft: false
---

# 52-Week Go Learning Plan
> For Python developers focused on scripting and automation.

---

## Quarter 1 (Weeks 1–13): Foundations — "Think in Go"

### Week 1–2: Environment & Syntax Crash Course
✔ Install Go and set up VS Code with the official Go extension
✔ Complete [A Tour of Go](https://go.dev/tour) — do every exercise
✔ Understand `:=` vs `var` declaration
✔ Understand zero values (no `None` in Go)
✔ Understand `if err != nil` error pattern (no `try/except`)
✔ **Project:** Port a simple Python script (file renamer or directory walker) to Go

### Week 3–4: Types, Structs, and Interfaces
✔ Learn primitive types, arrays, slices, maps
✔ Learn structs (Go's answer to Python classes — no inheritance)
✔ Understand interfaces and implicit satisfaction
✔ Understand pointers (`*` and `&`)
✔ **Project:** Build a CLI contact book — add/list/search contacts stored in a JSON file

### Week 5–6: Functions, Error Handling, and Packages
✔ Learn multiple return values and the idiomatic error pattern
✔ Learn named returns and variadic functions
✔ Understand package structure: `main`, `go.mod`, `go.sum`
✔ Explore standard library: `fmt`, `os`, `io`, `bufio`, `strings`, `strconv`
✔ **Project:** Build a log parser — reads a log file, filters by severity, outputs a summary

### Week 7–8: File I/O and the `os`/`path` Packages
✔ Learn `os.Open`, `os.Create`, `os.ReadFile`, `os.WriteFile`
✔ Learn `filepath.Walk` (equivalent to Python's `os.walk`)
✔ Read CSV files with `encoding/csv`
✔ Read/write JSON with `encoding/json` (marshal/unmarshal)
✔ **Project:** A script that watches a folder for new CSV files and appends summaries to a master report

### Week 9–10: CLI Tools with `flag` and `cobra`
✔ Learn the standard `flag` package
✔ Learn `github.com/spf13/cobra` for sub-commands
✔ Handle flags, args, and input validation
✔ Use `os.Args`, `os.Stdin`, `os.Stdout`, `os.Stderr`
✔ **Project:** A multi-command CLI tool — e.g., `mytool scan`, `mytool report`, `mytool clean`

### Week 11–13: Testing and Benchmarking
✔ Write `TestXxx` functions using the `testing` package
✔ Use `t.Run` for subtests
✔ Write table-driven tests (Go's idiomatic test pattern)
✔ Run `go test ./...` with `-v`, `-run`, `-bench` flags
✔ Add `testify` for assertions
✔ **Milestone:** Port one real Python automation script you own to Go — with tests

---

## Quarter 2 (Weeks 14–26): Intermediate — Concurrency & Real Programs

### Week 14–16: Goroutines and Channels
✔ Launch goroutines with `go func()`
✔ Use unbuffered and buffered channels
✔ Use directional channels
✔ Use the `select` statement
✔ Compare to Python's `asyncio` and `threading`
✔ **Project:** Concurrent URL checker — fan out HTTP checks to 50 URLs, collect results

### Week 17–18: Sync Primitives and the `sync` Package
✔ Use `sync.WaitGroup` to coordinate goroutines
✔ Use `sync.Mutex` and `sync.RWMutex` to protect shared state
✔ Use `sync.Once` for lazy initialization
✔ Use `context.Context` for cancellation and timeouts
✔ **Project:** Parallel file processor — hash every file concurrently, print duplicates

### Week 19–21: HTTP and Networking
✔ Make HTTP requests: `http.Get`, `http.Post`, custom clients with timeouts
✔ Parse JSON API responses
✔ Build a simple HTTP server: `http.HandleFunc`, `http.ListenAndServe`
✔ **Project:** A script that polls a REST API on a schedule, transforms data, writes results to file or calls a webhook

### Week 22–23: Working with Databases
✔ Use `database/sql` with a driver (`lib/pq` for Postgres, `mattn/go-sqlite3` for SQLite)
✔ Write prepared statements and transactions
✔ Use `sqlx` or `pgx` for ergonomic query mapping
 **Project:** Port a Python DB automation script — pull, transform, and upsert data nightly

### Week 24–26: Process Execution and Shell Interop
✔ Run external commands with `os/exec`
✔ Capture stdout/stderr, pipe and stream output
✔ Manage environment variables: `os.Getenv`, `os.Setenv`
✔ Handle OS signals: `os/signal`, `syscall`
 **Milestone:** Build a Go automation tool you would normally write in Python — ship it

---

## Quarter 3 (Weeks 27–39): Advanced — Production Patterns

### Week 27–29: Generics (Go 1.18+)
✔ Understand type parameters and constraints
✔ Write generic functions and types
✔ Know when to use generics vs interfaces
✔ Explore `golang.org/x/exp/slices` and `maps` packages
 **Project:** Write a generic pipeline/filter/map utility library for personal use

### Week 30–31: Embedding, Composition, and Advanced Interfaces
✔ Use struct embedding for composition over inheritance
✔ Compose interfaces
✔ Master the `io.Reader`/`io.Writer` ecosystem
✔ Use `io.TeeReader`, `io.MultiWriter`, `bufio.Scanner`

### Week 32–34: Configuration, Logging, and Observability
✔ Use `viper` for config files (YAML/TOML/env vars)
✔ Add structured logging with `log/slog` (Go 1.21+) or `zap`/`zerolog`
✔ Expose metrics with `expvar` or `prometheus/client_golang`
 **Project:** Add structured logging, config file support, and a `/metrics` endpoint to an earlier project

### Week 35–37: Advanced Concurrency Patterns
✔ Implement the worker pool pattern
✔ Implement pipeline patterns
✔ Use `errgroup` (`golang.org/x/sync/errgroup`) for concurrent tasks with error propagation
✔ Implement rate limiting with `time.Ticker` and `golang.org/x/time/rate`
 **Project:** A robust web scraper with rate limiting, retries, worker pools, and structured output

### Week 38–39: Building and Distributing Go Binaries
✔ Use `go build` and `go install`
✔ Cross-compile with `GOOS` and `GOARCH`
✔ Embed static files with `//go:embed`
✔ Set up GoReleaser for releases
✔ Write a Dockerfile for a Go app
 **Milestone:** Ship one automation tool as a real binary — cross-compiled for Linux, Windows, and Mac

---

## Quarter 4 (Weeks 40–52): Mastery — Real-World Projects

### Week 40–42: gRPC and Protocol Buffers
✔ Set up `protoc`, `protoc-gen-go`, `google.golang.org/grpc`
✔ Implement unary RPCs
✔ Implement streaming RPCs
✔ Compare to Python's `grpc` library

### Week 43–44: Writing Go Libraries
✔ Design a public API — exported vs unexported identifiers
✔ Follow `godoc` documentation conventions
✔ Apply semantic versioning with Go modules
✔ Write example functions (`ExampleXxx`) inside tests

### Week 45–47: Performance Profiling
✔ Use `pprof` for CPU and memory profiling
✔ Run `go test -bench` and analyze with `benchstat`
✔ Understand escape analysis (`go build -gcflags='-m'`)
✔ Identify when and why Go outperforms Python

### Week 48–50: Capstone Project
Pick one substantial automation tool to build in Go that you would have previously built in Python:
-  Option A: Parallel log aggregator across servers via SSH
- Option B: Local CI runner that watches file changes and runs test suites
- Option C: REST API + CLI tool that wraps an internal service
- Option D: Go replacement for a real cron/automation script you maintain
 **Complete the capstone project with tests, logging, config, and a distributable binary**

### Week 51–52: Review, Polish, and Community
✔ Read [100 Go Mistakes](https://github.com/teivah/100-go-mistakes)
✔ Refactor Q1–Q3 code with your new knowledge
✔ Contribute a small fix to an open-source Go project
✔ Write a blog post or internal doc comparing your Python vs Go versions of a real tool

---

## Essential Resources

| Resource | Purpose |
|---|---|
| [go.dev/tour](https://go.dev/tour) | Week 1–2 syntax foundation |
| [Go by Example](https://gobyexample.com) | Quick pattern reference throughout |
| [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/) | TDD-driven learning, weeks 3–13 |
| *Learning Go* by Jon Bodner (O'Reilly, 2nd ed.) | Best book for Python devs — read Q1–Q2 |
| [100 Go Mistakes](https://github.com/teivah/100-go-mistakes) | Read in Q4, reference throughout |
| [Effective Go](https://go.dev/doc/effective_go) | Style and idioms — read after week 8 |
| [pkg.go.dev](https://pkg.go.dev) | Standard library reference — bookmark this |

---

## Python → Go Mental Model Shifts

| Python habit | Go equivalent | Why it matters |
|---|---|---|
| `try/except` everywhere | `if err != nil` on every call | Errors are values, not exceptions |
| Duck typing | Explicit interfaces | Compiler checks, not runtime surprises |
| List comprehensions | `for` loops (or generic `slices.Map`) | Embrace verbosity — it's readable |
| `None` | Zero values (`0`, `""`, `nil`) | No null pointer surprises |
| `pip install` | `go get` + `go.mod` | Reproducible builds by design |
| `async/await` | Goroutines + channels | Much simpler mental model |

---

> **Top tip:** Take real Python scripts you maintain and rewrite them in Go. You already know what the program should do — so you can focus entirely on Go idioms, not problem-solving.
