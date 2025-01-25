document.getElementById('create-post-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const postData = {
        title: document.getElementById('create-post-title').value,
        username: document.getElementById('select').value,
        // username: 'user1',
        subRedditName: 'Technology',
        content: document.getElementById('create-post-content').value
    };

    console.log('Creating post:', postData);

    const response = await sendPost(postData);
    console.log('Post created:', response);
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

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
