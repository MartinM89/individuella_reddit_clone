import { fetchPost } from './fetchPostService.js';

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        console.error('No post id found in the url');
        return;
    }


    const post = await fetchPost(postId);
    const postContainer = document.getElementById('post-container');
    const commentsContainer = document.getElementById('comments-container');

    if (post) {
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

        postContainer.innerHTML = `
                <div id="rating-buttons">
                    <p id="rate-up"></p>
                    <p id="rating">${postRating}</p>
                    <p id="rate-down"></p>
                </div>
                <div id="post-info">
                    <p id="post-title">${post.title}</p>
                    <p id="post-details">submitted ${postTime} ago by <span>${post.userName}</span></p>
                    <p id="post-content">${post.content}</p>
                </div>
            `;

        const comments = post.comments.$values;
        comments.forEach((comment, index) => {
            const commentLikes = comment.likes;
            const commentDislikes = comment.dislikes;
            const commentRating = commentLikes - commentDislikes;

            const commentDate = new Date(comment.date);
            const diffInhours = Math.floor((currentDate - commentDate) / (1000 * 60 * 60));

            let commentTime;
            if (diffInhours >= 24 * 365) {
                commentTime = Math.floor(diffInhours / 24 / 365) + ' years';
            } else if (diffInhours >= 24 * 30) {
                commentTime = Math.floor(diffInhours / 24 / 30) + ' months';
            } else if (diffInhours >= 24 * 7) {
                commentTime = Math.floor(diffInhours / 24 / 7) + ' weeks';
            } else if (diffInhours >= 24) {
                commentTime = Math.floor(diffInhours / 24) + ' days';
            } else if (diffInhours < 1) {
                const diffInMinutes = Math.floor((currentDate - postDate) / (1000 * 60));
                commentTime = diffInMinutes + ' minutes';
            } else {
                commentTime = diffInhours + ' hours';
            }

            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `
                <div class="comment-container">
                    <div class="comment-rating-buttons">
                        <p class="comment-rate-up"></p>
                        <p class="comment-rate-down"></p>
                    </div>
                    <div class="comment-content">
                        <p class="comment-details"><span>${comment.userName}</span> ${commentRating} points ${commentTime} ago</p>
                        <p class="post-comment">${comment.content}</p>
                    </div>
                </div>
            `;

            commentsContainer.appendChild(commentDiv);
        });
    }
});
