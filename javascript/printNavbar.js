document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.querySelector('nav');

    if (navContainer) {
        navContainer.innerHTML = `
            <a id="my-subreddits" href="">MY SUBREDDITS &#x1F783</a>
            <a id="popular" href="../index.html">POPULAR</a>
            <p>&ndash;</p>
            <a class="top-bar-links" href="../index.html">ALL</a>
            <p>&ndash;</p>
            <a class="top-bar-links" href="../index.html">USERS</a>
            <p>&vert;</p>
            <div id="top-subreddits"></div>
            <a id="more-button" href="">MORE &#187</a>
        `;
    }
});
