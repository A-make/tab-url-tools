const test = require("node:test");
const assert = require("node:assert/strict");
const { extractUrls, formatTabs } = require("../utils.js");

test("extracts URLs from Markdown without keeping the closing link parenthesis", () => {
  const input = "[Sky Map](https://www.skymaponline.net/)\n[Onefetch](https://github.com/o2sh/onefetch)";

  assert.deepEqual(extractUrls(input), [
    "https://www.skymaponline.net/",
    "https://github.com/o2sh/onefetch",
  ]);
});

test("preserves balanced parentheses inside a URL", () => {
  const input = "[True Size](https://thetruesize.com/#?borders=1~!value(MTc1)MQ)";

  assert.deepEqual(extractUrls(input), [
    "https://thetruesize.com/#?borders=1~!value(MTc1)MQ",
  ]);
});

test("normalizes www URLs and removes duplicates", () => {
  const input = "www.example.com, https://example.com www.example.com";

  assert.deepEqual(extractUrls(input), [
    "https://www.example.com",
    "https://example.com",
  ]);
});

test("ignores non-http URLs and text without URLs", () => {
  assert.deepEqual(extractUrls("mailto:test@example.com file:///tmp/test no URL"), []);
});

test("formats tabs as URL-only output", () => {
  const tabs = [
    { title: "One", url: "https://one.example" },
    { title: "Two", url: "https://two.example" },
  ];

  assert.equal(formatTabs(tabs, "url"), "https://one.example\nhttps://two.example");
});