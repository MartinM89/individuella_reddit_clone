document.addEventListener("DOMContentLoaded", function () {
    const footerContainer = document.querySelector('footer');

    if (footerContainer) {
        footerContainer.innerHTML = `
            <div id="footer-box">
                <div id="about">
                    <p>about</p>
                    <a href="">blog</a>
                    <a href="">about</a>
                    <a href="">advertising</a>
                    <a href="">career</a>
                </div>
                <div id="help">
                    <p>help</p>
                    <a href="">site rules</a>
                    <a href="">Reddit help center</a>
                    <a href="">reddiquette</a>
                    <a href="">mod guidelines</a>
                    <a href="">contact us</a>
                </div>
                <div id="apps">
                    <p>apps & tools</p>
                    <a href="">Reddit for iPhone</a>
                    <a href="">Reddit for Android</a>
                    <a href="">mobile website</a>
                </div>
            </div>
        `;
    }
});
