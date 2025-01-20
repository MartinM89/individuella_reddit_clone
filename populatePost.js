import { fetchAllPosts } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const posts = await fetchAllPosts();

    if (posts) {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-div');

            postDiv.innerHTML = `
                <p class="post-number">${post.id}</p>
                <div class="rating-buttons-div">
                    <p class="rate-up">&uArr;</p>
                    <p class="rating">${post.rating}</p>
                    <p class="rate-down">&dArr;</p>
                </div>
                <img class="post-image" src="images/post-image.svg" alt="">
                <div class="post-details">
                    <a class="post-title" href="">${post.title}</a>
                    <p class="post-time">submitted ${post.postDate} hours ago by </p>
                    <a class="post-op" href="">${post.username}</a>
                    <p class="post-to"> to </p>
                    <a class="post-subreddit" href="">${post.subReddit}</a>
                    <div class="post-subdetails">
                        <a class="post-comments" href="">${post.commentAmount} comments</a>
                        <a class="post-share" href="">share</a>
                        <a class="post-save" href="">save</a>
                        <a class="post-hide" href="">hide</a>
                        <a class="post-report" href="">report</a>
                    </div>
                </div>
            `;

            document.body.appendChild(postDiv);
        });
    }
});
