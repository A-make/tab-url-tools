# Tab URL Tools

Tab URL Tools helps you move tabs between Chromium browsers and profiles. Copy
the URLs from one window, then paste, extract, open, or bookmark them in
another browser or profile.

## Features

- Copies every tab in the current window.
- Opens pasted URLs in new tabs.
- Saves pasted URLs as browser favourites/bookmarks.
- Supports three output formats:
  - **URL only**: one URL per line (default)
  - **Title - Markdown link**: `[Title](https://example.com)`
  - **Title + URL (plain text)**: title followed by the URL

## Use cases

- Move tabs between Chromium browsers or profiles using the clipboard.
- Copy all open tab URLs into a Markdown document or notes file.
- Extract URLs from Markdown, HTML, bullet lists, or surrounding text.
- Open a saved list of URLs as new tabs.
- Save a pasted URL list into a chosen browser bookmark folder.

## Install

1. Clone or download this repository.
2. Open your browser's extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the project directory containing `manifest.json`.

The extension should now appear in the browser toolbar.

## Usage

1. Open the window containing the tabs you want to copy.
2. Select **Tab URL Tools** from the extensions toolbar.
3. Choose an output format.
4. Click **Copy to Clipboard**.

The action popup has a fixed browser-controlled size. Use **Open in tab**
to open the same tool in a normal browser tab when you need more space; that
view can be resized with the browser window.

Only tabs in the current browser window are included.

To work with pasted URLs, enter text containing one or more URLs in the **Open
or save pasted URLs** box. Plain URLs, Markdown links, HTML links, bullet lists,
and other text formats are supported. URLs can be separated by new lines or
spaces. Choose **Extract URLs** to clean the input into one URL per line. Then
choose **Open URLs** to open them in new tabs, or **Save
Favourites** to add them to the selected bookmark folder. Choose the
destination from **Save favourites in** before saving.

## Development

This extension has no build step or external dependencies. Edit the source
files, then click **Reload** for the extension on the browser's extensions
page to apply changes.

The pure URL extraction and tab-formatting helpers have tests. With Node.js
installed, run `npm test` from the project directory.

The icon source is `icons/icon.svg`, with PNG sizes generated for the browser
toolbar and extension management page.

## Permissions

- `tabs`: reads the titles and URLs of tabs in the current window.
- `clipboardWrite`: allows the formatted tab list to be copied to the
  clipboard.
- `bookmarks`: saves pasted URLs as browser bookmarks.
