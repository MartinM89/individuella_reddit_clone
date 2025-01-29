function getLocalStorageData() {

    const userName = window.localStorage.getItem('userName');
    const subRedditName = window.localStorage.getItem('subRedditName');

    if (userName === null || subRedditName === null) {
        return;
    }

    const userSelect = document.getElementById('select-user');
    const subredditSelect = document.getElementById('select-subreddit');

    setTimeout(() => {
        userSelect.value = userName;

        subredditSelect.value = subRedditName;

        console.log('User select value set to:', userSelect.value);
        console.log('Subreddit select value set to:', subredditSelect.value);
    }, 30);
}

document.addEventListener('DOMContentLoaded', getLocalStorageData);
