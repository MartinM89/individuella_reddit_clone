document.addEventListener("DOMContentLoaded", function () {
    const headerNavContainer = document.querySelector('#header-nav');

    if (headerNavContainer) {
        headerNavContainer.innerHTML = `
            <a href="../index.html">
                <img src="../images/reddit_logo.svg" alt="">
             </a>
            <a id="logo-options" href="">hot</a>
            <a href="">new</a>
            <a href="">rising</a>
            <a href="">controversial</a>
            <a href="">top</a>
            <a href="">wiki</a>
            <div id="sign-up-div">
                <p>Want to join? <span>Log in</span> or <span class="sign-up-button">sign up</span> in seconds.</p>
            </div>
        `;
    }
});
