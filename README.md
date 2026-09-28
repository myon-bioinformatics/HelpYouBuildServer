# Help You Build Server

> [!IMPORTANT]
> **Archived / no longer actively maintained.**
>
> This repository is preserved as a historical beginner-oriented collection of tiny localhost HTTP server examples in several languages. It is not actively maintained or used as a production server framework.

## Historical purpose

The repository demonstrates the same small POST/GET exercise using:

- Go — `localhost:3010`
- Python — `localhost:3020`
- Deno — `localhost:3030`
- Ruby — `localhost:3040`
- Node.js — `localhost:3050`
- Bun — `localhost:3060`
- PHP — `localhost:3070`
- Elixir — `localhost:3080`
- Rust — `localhost:3090`

The examples are intentionally small and are best treated as learning/reference material.

## Final dependency state

Most examples use only their language/runtime standard library or built-in server APIs.

- **Go:** standard library only. The final `go.mod` intentionally contains no third-party requirements.
- **Python:** standard library only.
- **Deno:** `Deno.serve()`, no package install.
- **Ruby:** requires WEBrick; the final snapshot is recorded in `Gemfile` as `webrick 1.9.2`.
- **Node.js:** built-in `node:http`, no npm package install.
- **Bun:** built-in `Bun.serve()`.
- **PHP:** built-in development server.
- **Elixir:** Erlang/OTP `:gen_tcp`.
- **Rust:** standard library only; `rust/Cargo.toml` has no external crates.

For the Ruby example:

```console
bundle install
ruby main.rb
```

## Safety and scope

These examples bind to localhost and were created for local learning. They are not hardened production servers. Do not expose them directly to untrusted networks without independently reviewing authentication, input validation, TLS, logging, resource limits, and other security requirements.

## Repository status

No further feature development, dependency automation, bot-driven maintenance, or compatibility certification is planned. The repository is intended to remain public and read-only after GitHub archival.
