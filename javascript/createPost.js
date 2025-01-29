document.getElementById('create-post-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    window.localStorage.setItem('userName', document.getElementById('select-user').value);
    window.localStorage.setItem('subRedditName', document.getElementById('select-subreddit').value);

    const postData = {
        Title: document.getElementById('create-post-title').value,
        UserName: document.getElementById('select-user').value,
        SubRedditName: document.getElementById('select-subreddit').value,
        Content: document.getElementById('create-post-content').value
    };

    console.log('Creating post:', postData);

    try {
        const response = await sendPost(postData);
        console.log('Post created:', response);
    } catch (error) {
        console.error('Error creating post:', error);
    }
});

async function sendPost(postData) {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/addpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        window.location.href = '/index.html';

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
