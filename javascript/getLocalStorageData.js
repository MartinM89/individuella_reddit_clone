export function getLocalStorageData() {

    const userName = window.localStorage.getItem('userName');
    const subRedditName = window.localStorage.getItem('subRedditName');

    if (userName === null || subRedditName === null) {
        return;
    }

    const userSelect = document.getElementById('select-user');
    const subredditSelect = document.getElementById('select-subreddit');

    // setTimeout(() => {
    //     userSelect.value = userName;
    //     subredditSelect.value = subRedditName;
    // }, 1000);

    userSelect.value = userName;
    subredditSelect.value = subRedditName;
}

// document.addEventListener('DOMContentLoaded', getLocalStorageData);
