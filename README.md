# react-introspection

Promoted Introspection allows you to view critical data for your Delivery results, and also moderate those results in real-time.

## Features

Uses
- Material UI
- Emotion style support
- [TypeScript](https://www.typescriptlang.org/) support
- [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/))
- Unit tests ([Jest](https://jestjs.io/)
- Minified output with [Terser](https://terser.org/)
- Bundle size validation with [size-limit](https://github.com/ai/size-limit)
- Flexible builds with [Rollup](https://www.rollupjs.org/)
- [CHANGELOG.md](https://keepachangelog.com/en/1.0.0/) template

## Scripts

- Run most commands: `npm run finish`
- Build the project: `npm run build`
  - Validate output bundle size with `npm run size`
- Lint the project: `npm run lint`
- Run unit tests: `npm test` or `npm test`

## When developing locally

If you want to test local changes in an actual deployment, use `npm link`.

1. Run `npm run updateLink`.
4. Go to client directory and run `npm link @promotedai/react-introspection`.

When you update `react-introspection`, run `npm run updateLink`.

When you want to undo, use `npm unlink` in `@promotedai/react-introspection/dist` and `npm unlink @promotedai/react-introspection` in the client directory.

## Deploy

We use a GitHub action that runs semantic-release to determine how to update versions.  Just do a normal code review and this should work.  Depending on the message prefixes (e.g. `feat: `, `fix: `, `clean: `, `docs: `), it'll update the version appropriately.
