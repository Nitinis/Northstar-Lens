# Northstar Lens

Northstar Lens is a visual search app that helps users explore image ideas by topic. The interface is designed for a clean, calm browsing experience with a sticky header, quick-pick category chips, and a spacious results layout that adapts to any screen size.

Search Wikimedia Commons for images and browse the results in a responsive card grid. Searches work from the form or the quick-pick category buttons, and each image links to its full version in a new tab.

The app uses the key-free Wikimedia Commons API. It trims and encodes search terms, ignores empty searches, and displays a result count and a clear control alongside the image cards. While a search is in progress, the app shows an animated loading indicator and clears the previous results. It displays a friendly message for searches with no images and for network or API errors.

The warm, earthy palette and search-first layout make the app feel inviting without copying the reference design. The quick-pick row gives people a fast way to start exploring common themes like nature, cities, and travel.

## Deploy with GitHub Pages

1. Push the repository to GitHub.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose the `main` branch and `/ (root)`, then save.
4. Once the deployment finishes, open the URL shown in the Pages settings. For this repository it will typically be `https://nitinis.github.io/Northstar-Lens/`.

To verify the app before submitting, search for a common topic to see the loading and results states, try an unlikely term to check the no-results message, and temporarily disconnect or block the Wikimedia API request to check the error message.
