# Tab URL Tools Project Instructions

## Project shape

- This is a dependency-free Manifest V3 browser extension targeting Edge/Chromium.
- A key use case is transferring tabs between Chromium browsers and profiles through copied URL text, but the product should support broader URL workflows too.
- Keep `manifest.json` at the repository root so the project remains loadable as an unpacked extension.
- Keep extension runtime files and assets directly discoverable from the manifest. Do not introduce a build step or `src/` folder unless the project grows enough to justify it.
- Keep `utils.js` usable in both the browser and Node's CommonJS test runner.

## Behavior

- The extension copies tabs from the current browser window.
- URL extraction must support plain URLs, `www.` URLs, Markdown, HTML, lists, surrounding text, duplicates, and punctuation.
- Closing Markdown parentheses must be removed without removing balanced parentheses that are part of a URL.
- URL-only output is the default copy format.
- Pasted URLs can be opened in new tabs or saved to an explicitly selected bookmark folder.
- The action popup is fixed-size by browser design. The `view=larger` tab mode provides a wider, resizable workspace.
- Preserve system light/dark theme support with `prefers-color-scheme`.

## Editing and validation

- Prefer small, focused changes that preserve the current browser APIs and UI behavior.
- Keep `tabs`, `clipboardWrite`, and `bookmarks` permissions justified by actual features.
- Add or update tests in `test/` for pure URL parsing and formatting behavior, especially URL punctuation and Markdown edge cases.
- Run `npm test` when Node.js is available. If it is unavailable, use editor diagnostics and focused JSON/source wiring checks, and report that the test suite could not run.
- Validate that every file referenced by `manifest.json` exists before packaging.
- Do not add secrets, remote services, analytics, or data collection without an explicit product decision and privacy documentation.

## Publishing

- Increment the manifest version for releases.
- Package the extension with `manifest.json` at the archive root and include the icon PNGs.
- Store submissions should include permission justifications, screenshots, support information, and a privacy policy explaining that tab and bookmark data stays local.
