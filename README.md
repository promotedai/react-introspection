# react-introspection

Promoted Introspection allows you to view critical data for your Delivery results, and also moderate those results in real-time.

## Features

Uses

- Material UI
- [TypeScript](https://www.typescriptlang.org/) support
- [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/))
- Unit tests ([Jest](https://jestjs.io/)
- Flexible builds with [Rollup](https://www.rollupjs.org/)
- [CHANGELOG.md](https://keepachangelog.com/en/1.0.0/) template

## Scripts

- Run most commands: `npm run finish`
- Build the project: `npm run build`
  - Validate output bundle size with `npm run size`
- Lint the project: `npm run lint`
- Run unit tests: `npm test` or `npm test`
- Run storybook: `npm run storybook`

## When developing locally

If you want to test local changes in an actual deployment, use `npm build`, `npm pack` and then (from the client's repo) `npm install <the packaged tarball>`. I've found `npm link` to be unpredictable and would not recommend.

The most straightforward way to develop locally is to use Storybook (if there's nothing else running on port 6006, you'll be able to `npm run storybook` and then connect to http://localhost:6006). Just be sure to keep the mocks updated with the actual responses from the API.

## Deploy

We use a GitHub action that runs semantic-release to determine how to update versions. Just do a normal code review and this should work. Depending on the message prefixes (e.g. `feat: `, `fix: `, `clean: `, `docs: `), it'll update the version appropriately.

One thing to be cautious of when installing this in a client, is that this uses esm modules (specifically to handle lazy-loading), so you'll need to make sure the client is configured to support that. This can be deceptive because dev-mode webservers (like webpack-dev-server) will probably work without any problems, but production builds may fail depending on its configuration. This should not be an issue in newer repositories.
