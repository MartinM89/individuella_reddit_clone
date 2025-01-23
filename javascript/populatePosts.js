import { fetchAllPosts } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const posts = await fetchAllPosts();
    const postsContainer = document.getElementById('posts-container');

    if (posts) {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-div');

            const postDate = new Date(post.submitted);
            const currentDate = new Date();
            const diffInhours = Math.floor((currentDate - postDate) / (1000 * 60 * 60));

            postDiv.innerHTML = `
                <p class="post-number">${post.id}</p>
                <div class="rating-buttons-div">
                    <p id="rate-up"></p>
                    <p id="rating">${post.rating}</p>
                    <p id="rate-down"></p>
                </div>
                <img id="post-image" src="images/post-image.svg" alt="">
                <div id="flex">
                    <a id="post-title" href="html/post-page.html">${post.title}</a>
                    <div id="flex-column">
                        <div id="post-preview"></div>
                        <div id="post-details">
                            <div>
                                <p class="post-time">submitted ${diffInhours} hours ago by </p>
                                <a class="post-op" href="">${post.username}</a>
                                <p class="post-to"> to </p>
                                <a class="post-subreddit" href="">r/${post.subReddit}</a>
                            </div>
                            <div id="post-subdetails">
                                <a class="post-comments" href="">${post.commentAmount} comments</a>
                                <a class="post-share" href="">share</a>
                                <a class="post-save" href="">save</a>
                                <a class="post-hide" href="">hide</a>
                                <a class="post-report" href="">report</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            postsContainer.appendChild(postDiv);
        });
    }
});
