import { fetchPost } from './fetchPostService.js';
import { upVotePost } from './Reactions/upVote.js';
import { downVotePost } from './Reactions/downVote.js';
import { upVoteComment } from './Reactions/upVote.js';
import { downVoteComment } from './Reactions/downVote.js';

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    let commentNumber = 1;
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
        const diffInMinutes = Math.floor((currentDate - postDate) / (1000 * 60));

        let postTime;
        if (diffInhours >= 24 * 365) {
            postTime = Math.floor(diffInhours / 24 / 365) + ' years ago';
        } else if (diffInhours >= 24 * 30) {
            postTime = Math.floor(diffInhours / 24 / 30) + ' months ago';
        } else if (diffInhours >= 24 * 7) {
            postTime = Math.floor(diffInhours / 24 / 7) + ' weeks ago';
        } else if (diffInhours >= 24) {
            postTime = Math.floor(diffInhours / 24) + ' days ago';
        } else if (diffInhours >= 1) {
            postTime = Math.floor(diffInhours) + ' hours ago';
        } else if (diffInMinutes < 60 && diffInMinutes >= 1) {
            postTime = diffInMinutes + ' minutes ago';
        } else if (diffInhours === 0) {
            postTime = 'recently';
        }

        postContainer.innerHTML = `
                <div id="rating-buttons">
                    <p id="rate-up"></p>
                    <p id="rating">${postRating}</p>
                    <p id="rate-down"></p>
                </div>
                <div id="post-info">
                    <p id="post-title">${post.title}</p>
                    <p id="post-details">submitted ${postTime} by <span>${post.userName}</span></p>
                    <p id="post-content">${post.content}</p>
                </div>
            `;

        const postRateUpElement = document.getElementById('rate-up');
        const postRateDownElement = document.getElementById('rate-down');
        const postRatingElement = document.getElementById('rating');

        if (post.isLiked) {
            postRateUpElement.style.backgroundPosition = '-42px -1676px';
            postRatingElement.style.color = 'rgb(255, 140, 97)';
            postRateDownElement.style.backgroundPosition = '-108px -1654px';
        } else if (post.isDisliked) {
            postRateDownElement.style.backgroundPosition = '0px -1676px';
            postRatingElement.style.color = 'rgb(148, 148, 255)';
            postRateUpElement.style.backgroundPosition = '-21px -1676px';
        } else {
            postRateUpElement.style.backgroundPosition = '-21px -1676px';
            postRateDownElement.style.backgroundPosition = '-108px -1654px';
            postRatingElement.style.color = 'rgb(182, 182, 182)';
        }

        // Add event listeners to the post for upvoting
        postRateUpElement.addEventListener('click', async function () {
            const reactionData = {
                PostOrCommentId: post.id,
            }

            try {
                const response = await upVotePost(reactionData);
                window.location.reload();
            } catch (error) {
                console.error('Error liking post:', error);
            }
        });

        // Add event listeners to the post for downvoting
        postRateDownElement.addEventListener('click', async function () {
            const reactionData = {
                PostOrCommentId: post.id,
            }

            try {
                const response = await downVotePost(reactionData);
                window.location.reload();
            } catch (error) {
                console.error('Error disliking post:', error);
            }
        });

        // Add event listeners to each comment for upvoting and downvoting
        const comments = post.comments.$values;
        comments.forEach((comment) => {
            const commentLikes = comment.likes;
            const commentDislikes = comment.dislikes;
            const commentRating = commentLikes - commentDislikes;

            const commentDate = new Date(comment.date);
            const diffInhours = Math.floor((currentDate - commentDate) / (1000 * 60 * 60));
            const diffInMinutes = Math.floor((currentDate - commentDate) / (1000 * 60));

            let commentTime;

            if (diffInhours >= 24 * 365) {
                commentTime = Math.floor(diffInhours / 24 / 365) + ' years ago';
            } else if (diffInhours >= 24 * 30) {
                commentTime = Math.floor(diffInhours / 24 / 30) + ' months ago';
            } else if (diffInhours >= 24 * 7) {
                commentTime = Math.floor(diffInhours / 24 / 7) + ' weeks ago';
            } else if (diffInhours >= 24) {
                commentTime = Math.floor(diffInhours / 24) + ' days ago';
            } else if (diffInhours >= 1) {
                commentTime = Math.floor(diffInhours) + ' hours ago';
            } else if (diffInMinutes < 60 && diffInMinutes >= 1) {
                commentTime = diffInMinutes + ' minutes ago';
            } else if (diffInhours === 0) {
                commentTime = 'recently';
            }

            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `
                <div id="comment-container">
                    <div class="comment-rating-buttons">
                        <p id="comment-rate-up-${commentNumber}" class="comment-rate-up"></p>
                        <p id="comment-rate-down-${commentNumber}" class="comment-rate-down"></p>
                    </div>
                    <div class="comment-content">
                        <p id="comment-details"><span>${comment.userName}</span> ${commentRating} points ${commentTime}</p>
                        <p id="post-comment">${comment.content}</p>
                    </div>
                </div>
            `;

            commentNumber++;

            commentsContainer.appendChild(commentDiv);
        });

        comments.forEach((comment, index) => {
            const commentRateUpElement = document.getElementById(`comment-rate-up-${index + 1}`);
            const commentRateDownElement = document.getElementById(`comment-rate-down-${index + 1}`);

            if (comment.isLiked) {
                commentRateUpElement.style.backgroundPosition = '-42px -1676px';
                commentRateDownElement.style.backgroundPosition = '-108px -1654px';
            } else if (comment.isDisliked) {
                commentRateDownElement.style.backgroundPosition = '0px -1676px';
                commentRateUpElement.style.backgroundPosition = '-21px -1676px';
            } else {
                commentRateUpElement.style.backgroundPosition = '-21px -1676px';
                commentRateDownElement.style.backgroundPosition = '-108px -1654px';
            }

            commentRateUpElement.addEventListener('click', async function () {
                const reactionData = {
                    PostOrCommentId: comment.id,
                }

                try {
                    const response = await upVoteComment(reactionData);
                    window.location.reload();
                } catch (error) {
                    console.error('Error liking comment:', error);
                }
            });

            commentRateDownElement.addEventListener('click', async function () {
                const reactionData = {
                    PostOrCommentId: comment.id,
                }

                try {
                    const response = await downVoteComment(reactionData);
                    window.location.reload();
                } catch (error) {
                    console.error('Error disliking comment:', error);
                }
            });
        });
    }
});
