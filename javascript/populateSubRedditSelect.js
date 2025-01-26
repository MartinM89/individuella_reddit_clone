import { fetchSubReddits } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const subReddits = await fetchSubReddits();
    const subRedditContainer = document.getElementById('select-subreddit');

    subReddits.forEach(subReddit => {
        const subRedditOption = document.createElement('option');

        subRedditOption.value = subReddit.name;
        subRedditOption.textContent = subReddit.name;

        subRedditContainer.appendChild(subRedditOption);
    });
});
