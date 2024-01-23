# Best Before

Helps to keep track of the best-before dates of my groceries. (**Still work in progress**)

## Instructions for Setup and Running

```shell
# install dependencies
# if `npm` is preferred, replace all `bun` with `npm`
bun install

# build assets
bun run build
# or use following if want to watch on file changes
bun run build:dev

# apply database migrations
bun run migrations:apply:local # check `package.json` for other options

# launch the development server
bun run dev
```

## Development Plan

- [x] Define database schema
- [x] `GET /items` to retrieve items from the database
- [x] `POST /items` to create a new item
- [x] Web UI showing an inventory list
- [ ] Implement creating new items in UI
- [ ] Better styling
- [ ] User authentication or daily database resets?
- [ ] Testing API server
- [ ] Testing UI

## Notes

This is a serverless application running on
[Cloudflare Pages](https://developers.cloudflare.com/pages/), and is using
[Cloudflare D1](https://developers.cloudflare.com/d1/) as the database.

The API server is developed using [Hono](https://hono.dev), and the web UI is
built using [React](https://react.dev).

**Disclaimer**: The application is experimental and not recommended for serious
use.
