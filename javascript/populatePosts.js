import { fetchAllPosts } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const posts = await fetchAllPosts();
    const postsContainer = document.getElementById('posts-container');

    let postNumber = 1;
    if (posts) {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-div');

            const postLikes = post.likes;
            const postDislikes = post.dislikes;
            const postRating = postLikes - postDislikes;

            const postDate = new Date(post.date);
            const currentDate = new Date();
            const diffInhours = Math.floor((currentDate - postDate) / (1000 * 60 * 60));



            let postTime;
            if (diffInhours >= 24 * 365) {
                postTime = Math.floor(diffInhours / 24 / 365) + ' years';
            } else if (diffInhours >= 24 * 30) {
                postTime = Math.floor(diffInhours / 24 / 30) + ' months';
            } else if (diffInhours >= 24 * 7) {
                postTime = Math.floor(diffInhours / 24 / 7) + ' weeks';
            } else if (diffInhours >= 24) {
                postTime = Math.floor(diffInhours / 24) + ' days';
            } else if (diffInhours < 1) {
                const diffInMinutes = Math.floor((currentDate - postDate) / (1000 * 60));
                postTime = diffInMinutes + ' minutes';
            } else {
                postTime = diffInhours + ' hours';
            }

            postDiv.innerHTML = `
                <p class="post-number">${postNumber}</p>
                <div class="rating-buttons-div">
                    <p id="rate-up"></p>
                    <p id="rating">${postRating}</p>
                    <p id="rate-down"></p>
                </div>
                <img id="post-image" src="images/post-image.svg" alt="">
                <div id="flex">
                    <a id="post-title" href="html/post-page.html">${post.title}</a>
                    <div id="flex-column">
                        <div id="post-preview-${postNumber}" class="post-preview"></div>
                        <div id="post-details">
                        <div id="post-details-${postNumber}">
                            <div>
                                <p class="post-time">submitted ${postTime} ago by </p>
                                <a class="post-op" href="">${post.username}</a>
                                <p class="post-to"> to </p>
                                <a class="post-subreddit" href="">r/${post.subRedditName}</a>
                            </div>
                            <div id="post-subdetails">
                                <a class="post-comments" href="">${post.commentCount} comments</a>
                                <a class="post-share" href="">share</a>
                                <a class="post-save" href="">save</a>
                                <a class="post-hide" href="">hide</a>
                                <a class="post-report" href="">report</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            postNumber++;

            postsContainer.appendChild(postDiv);
        });

        posts.forEach((post, index) => {
            const postPreviewElement = document.getElementById(`post-preview-${index + 1}`);
            const postDetailsElement = document.getElementById(`post-details-${index + 1}`);
            postPreviewElement.addEventListener('click', function () {
                const pElement = postPreviewElement.nextElementSibling;
                if (pElement && pElement.tagName === 'P') {
                    pElement.remove();
                    postDetailsElement.style.display = 'flex';
                    postDetailsElement.style.flexDirection = 'column';
                    postDetailsElement.style.color = 'gray';
                    postDetailsElement.style.fontSize = '0.6rem';
                } else {
                    const newPElement = document.createElement('p');
                    newPElement.classList.add('post-preview-content');
                    newPElement.textContent = post.content.substring(0, 60).trim() + '...';
                    postPreviewElement.insertAdjacentElement('afterend', newPElement);
                    postDetailsElement.style.display = 'none';
                }
            });
        });
    }
});
