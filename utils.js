(function (root, factory) {
  const utils = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = utils;
  } else {
    root.tabCopyUtils = utils;
  }
})(globalThis, function () {
  function extractUrls(text) {
    const matches = text.match(/(?:https?:\/\/|www\.)[^\s<>"'`]+/gi) || [];
    const urls = matches.map((url) => {
      let cleanedUrl = url.replace(/^[([{<]+|[\]},.;:!?]+$/g, "");
      while (
        cleanedUrl.endsWith(")") &&
        (cleanedUrl.match(/\)/g) || []).length > (cleanedUrl.match(/\(/g) || []).length
      ) {
        cleanedUrl = cleanedUrl.slice(0, -1);
      }
      return cleanedUrl.startsWith("www.") ? `https://${cleanedUrl}` : cleanedUrl;
    });

    return [...new Set(urls)].filter((url) => {
      try {
        return ["http:", "https:"].includes(new URL(url).protocol);
      } catch {
        return false;
      }
    });
  }

  function formatTabs(tabs, format) {
    return tabs
      .map((tab) => {
        const title = tab.title || tab.url;
        const url = tab.url || "";
        switch (format) {
          case "url":
            return url;
          case "plain":
            return `${title}\n${url}`;
          case "markdown":
          default:
            return `[${title}](${url})`;
        }
      })
      .join("\n");
  }

  return { extractUrls, formatTabs };
});