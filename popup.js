const copyBtn = document.getElementById("copyBtn");
const openViewBtn = document.getElementById("openViewBtn");
const formatSelect = document.getElementById("format");
const urlInput = document.getElementById("urlInput");
const extractBtn = document.getElementById("extractBtn");
const bookmarkFolderSelect = document.getElementById("bookmarkFolder");
const openBtn = document.getElementById("openBtn");
const bookmarkBtn = document.getElementById("bookmarkBtn");
const statusEl = document.getElementById("status");
const isLargerView = new URLSearchParams(window.location.search).get("view") === "larger";
const { extractUrls, formatTabs } = window.tabCopyUtils;

if (isLargerView) {
  document.body.classList.add("larger-view");
}

function getPastedUrls() {
  return extractUrls(urlInput.value);
}

function showError(err) {
  statusEl.style.color = "#dc2626";
  statusEl.textContent = "Failed: " + err.message;
}

function showSuccess(message) {
  statusEl.style.color = "#16a34a";
  statusEl.textContent = message;
}

async function loadBookmarkFolders() {
  const tree = await chrome.bookmarks.getTree();
  const folders = [];

  function collectFolders(nodes, depth = 0) {
    nodes.forEach((node) => {
      if (node.children) {
        if (node.id !== "0") {
          folders.push({
            id: node.id,
            title: `${"  ".repeat(depth)}${node.title || "Unnamed folder"}`,
          });
        }
        collectFolders(node.children, depth + 1);
      }
    });
  }

  collectFolders(tree);
  bookmarkFolderSelect.replaceChildren(new Option("Choose a folder...", ""));
  folders.forEach(({ id, title }) => {
    bookmarkFolderSelect.append(new Option(title, id));
  });
  bookmarkFolderSelect.disabled = folders.length === 0;
  bookmarkBtn.disabled = folders.length === 0;
}

loadBookmarkFolders().catch((err) => {
  bookmarkFolderSelect.replaceChildren(new Option("Unable to load folders", ""));
  bookmarkFolderSelect.disabled = true;
  bookmarkBtn.disabled = true;
  showError(err);
});

bookmarkFolderSelect.addEventListener("change", () => {
  bookmarkBtn.disabled = !bookmarkFolderSelect.value;
});

openViewBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("popup.html?view=larger") });
});

extractBtn.addEventListener("click", () => {
  const urls = getPastedUrls();
  if (!urls.length) {
    statusEl.style.color = "#b45309";
    statusEl.textContent = "No valid URLs found.";
    return;
  }

  urlInput.value = urls.join("\n");
  showSuccess(`Extracted ${urls.length} URL${urls.length === 1 ? "" : "s"}.`);
});

copyBtn.addEventListener("click", async () => {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const text = formatTabs(tabs, formatSelect.value);
    await navigator.clipboard.writeText(text);
    showSuccess(`Copied ${tabs.length} tab${tabs.length === 1 ? "" : "s"}!`);
  } catch (err) {
    showError(err);
  }
});

openBtn.addEventListener("click", async () => {
  const urls = getPastedUrls();
  if (!urls.length) {
    statusEl.style.color = "#b45309";
    statusEl.textContent = "Paste at least one valid URL first.";
    return;
  }

  try {
    await Promise.all(urls.map((url) => chrome.tabs.create({ url })));
    showSuccess(`Opened ${urls.length} URL${urls.length === 1 ? "" : "s"}.`);
  } catch (err) {
    showError(err);
  }
});

bookmarkBtn.addEventListener("click", async () => {
  const urls = getPastedUrls();
  if (!urls.length) {
    statusEl.style.color = "#b45309";
    statusEl.textContent = "Paste at least one valid URL first.";
    return;
  }
  if (!bookmarkFolderSelect.value) {
    statusEl.style.color = "#b45309";
    statusEl.textContent = "Choose a bookmark folder first.";
    return;
  }

  try {
    await Promise.all(urls.map((url) => chrome.bookmarks.create({
      parentId: bookmarkFolderSelect.value,
      title: url,
      url,
    })));
    showSuccess(`Saved ${urls.length} favourite${urls.length === 1 ? "" : "s"}.`);
  } catch (err) {
    showError(err);
  }
});
