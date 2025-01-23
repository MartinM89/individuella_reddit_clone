document.getElementById('new-text-post').addEventListener('click', function () {
    localStorage.setItem('reddit-post', 'Post title');
});

function updateUi() {
    let values = [], keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    document.getElementById('posts-container').textContent = values;
}
