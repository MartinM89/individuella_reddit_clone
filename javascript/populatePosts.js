import { fetchAllPosts } from './fetchPostService.js';
import { upVotePost } from './Reactions/upVote.js';
import { downVotePost } from './Reactions/downVote.js';


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

            postDiv.innerHTML = `
                <p class="post-number">${postNumber}</p>
                <div class="rating-buttons-div">
                    <p id="rate-up-${postNumber}" class="rate-up" style="background-position: -21px -1676px;"></p>
                    <p id="rating-${postNumber}" class="post-rating">${postRating}</p>
                    <p id="rate-down-${postNumber}" class="rate-down" style="background-position: -108px -1654px;"></p>
                </div>
                <img id="post-image" src="images/post-image.svg" alt="">
                <div id="flex">
                    <a id="post-title" href="html/post-page.html?id=${post.id}">${post.title}</a>
                    <div id="flex-column">
                        <div id="post-preview-${postNumber}" class="post-preview"></div>
                        <div id="post-details">
                        <div id="post-details-${postNumber}">
                            <div>
                                <p class="post-time">submitted ${postTime} by </p>
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

        // Add event listeners to each post for expanding and collapsing the post content
        posts.forEach((post, index) => {
            const postPreviewElement = document.getElementById(`post-preview-${index + 1}`);
            const postDetailsElement = document.getElementById(`post-details-${index + 1}`);
            postPreviewElement.addEventListener('click', function () {
                const pElement = postPreviewElement.nextElementSibling;
                if (pElement && pElement.tagName === 'P') {
                    pElement.remove();

                    postPreviewElement.style.backgroundPosition = '0px -549px';

                    postDetailsElement.style.display = 'flex';
                    postDetailsElement.style.flexDirection = 'column';
                    postDetailsElement.style.color = 'gray';
                    postDetailsElement.style.fontSize = '0.6rem';
                } else {
                    const newPElement = document.createElement('p');
                    newPElement.classList.add('post-preview-content');
                    newPElement.textContent = post.content.substring(0, 60).trim() + '...';

                    postPreviewElement.style.backgroundPosition = '0px -433px';
                    postPreviewElement.insertAdjacentElement('afterend', newPElement);

                    postDetailsElement.style.display = 'none';
                }
            });
        });

        // Add event listeners to each post for upvoting and downvoting
        posts.forEach((post, index) => {
            const postRateUpElement = document.getElementById(`rate-up-${index + 1}`);
            const postRateDownElement = document.getElementById(`rate-down-${index + 1}`);
            const postRatingElement = document.getElementById(`rating-${index + 1}`);

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
        });
    }
});
