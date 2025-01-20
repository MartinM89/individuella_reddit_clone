document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.querySelector('body');

    postsData.forEach(postData => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post-div');

        postDiv.innerHTML = `
            <p class="post-number">${postData.postNumber}</p>
            <div class="rating-buttons-div">
                <p class="rate-up">&uArr;</p>
                <p class="rating">${postData.postRating}</p>
                <p class="rate-down">&dArr;</p>
            </div>
            <img class="post-image" src="${postData.postImage}" alt="">
            <div class="post-details">
                <a class="post-title" href="">${postData.postTitle}</a>
                <p class="post-time">submitted ${postData.postDate} hours ago by </p>
                <a class="post-op" href="">${postData.postAuthor}</a>
                <p class="post-to"> to </p>
                <a class="post-subreddit" href="">${postData.postSubreddit}</a>
                <div class="post-subdetails">
                    <a class="post-comments" href="">${postData.postCommentsAmount} comments</a>
                    <a class="post-share" href="">share</a>
                    <a class="post-save" href="">save</a>
                    <a class="post-hide" href="">hide</a>
                    <a class="post-report" href="">report</a>
                </div>
            </div>
        `;

        postsContainer.appendChild(postDiv);
    });
});
