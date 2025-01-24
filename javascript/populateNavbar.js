import { fetchSubReddits } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const subReddits = await fetchSubReddits();
    const subRedditContainer = document.getElementById('top-subreddits');

    if (subReddits) {
        subReddits.forEach(subReddit => {
            const subRedditDiv = document.createElement('div');
            subRedditDiv.classList.add('post-div');

            subRedditDiv.innerHTML = `
                <a class="top-bar-links" href="">${subReddit.name}</a>
                <p> &ndash; </p>
            `;

            subRedditContainer.appendChild(subRedditDiv);
        });
    }
});
