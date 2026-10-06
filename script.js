const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
const clearButton = document.getElementById("clear-button");
const statusBar = document.querySelector(".status-bar");
let searchId = 0;

function render(items, query) {
  results.innerHTML = "";

  items.forEach((item) => {
    const imageInfo = item.imageinfo && item.imageinfo[0];
    if (!imageInfo) return;

    const card = document.createElement("article");
    card.className = "card";

    const link = document.createElement("a");
    link.href = imageInfo.url || imageInfo.thumburl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open ${item.title} in a new tab`);

    const image = document.createElement("img");
    image.src = imageInfo.thumburl || imageInfo.url;
    image.alt = item.title;
    image.loading = "lazy";

    const caption = document.createElement("p");
    caption.textContent = item.title;

    link.appendChild(image);
    card.appendChild(link);
    card.appendChild(caption);
    results.appendChild(card);
  });

  const count = results.childElementCount;
  statusBar.dataset.state = count === 0 ? "empty" : "results";
  resultCount.textContent = count === 0
    ? `No results for "${query}".`
    : `Showing ${count} ${count === 1 ? "result" : "results"} for "${query}".`;
  emptyState.hidden = count > 0;
  if (count === 0) {
    emptyState.textContent = "No images found. Try another search.";
  }
}

async function search(query, requestId) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    "&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*";

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image search failed (${response.status}).`);

  const data = await response.json();
  if (data.error) throw new Error(data.error.info || "The image search request failed.");
  if (requestId !== searchId) return;

  const items = data.query && data.query.pages
    ? Object.values(data.query.pages)
    : [];
  render(items, query);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  const requestId = ++searchId;
  statusBar.dataset.state = "loading";
  resultCount.textContent = `Searching for "${query}"...`;
  emptyState.hidden = true;
  results.innerHTML = "";
  results.setAttribute("aria-busy", "true");

  try {
    await search(query, requestId);
  } catch (error) {
    if (requestId !== searchId) return;
    console.error(error);
    results.innerHTML = "";
    results.setAttribute("aria-busy", "false");
    statusBar.dataset.state = "error";
    resultCount.textContent = "Search failed.";
    emptyState.textContent = "Could not load images. Please try again.";
    emptyState.hidden = false;
    return;
  }

  if (requestId === searchId) {
    results.setAttribute("aria-busy", "false");
  }
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    input.value = chip.textContent.trim();
    form.requestSubmit();
  });
});

clearButton.addEventListener("click", () => {
  searchId += 1;
  input.value = "";
  results.innerHTML = "";
  results.setAttribute("aria-busy", "false");
  statusBar.dataset.state = "idle";
  resultCount.textContent = "Showing 0 results";
  emptyState.textContent = "Search to see results";
  emptyState.hidden = false;
});
