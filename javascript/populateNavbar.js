import { fetchSubReddits } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const subReddits = await fetchSubReddits();
    const subRedditContainer = document.getElementById('top-subreddits');

    const subRedditsLength = subReddits.length;
    let subRedditsPrints = 1;

    subReddits.forEach(subReddit => {
        const subRedditDiv = document.createElement('div');
        subRedditDiv.classList.add('top-subreddits');

        if (subRedditsPrints < subRedditsLength) {
            subRedditDiv.innerHTML = `
                <a href="">${subReddit.name}</a>
                <p>&ndash;</p>
            `;
        } else {
            subRedditDiv.innerHTML = `
                <a href="">${subReddit.name}</a>
            `;
        }

        subRedditContainer.appendChild(subRedditDiv);
        subRedditsPrints++;
    });

});
