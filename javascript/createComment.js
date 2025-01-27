document.getElementById('create-comment-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const currentUrl = window.location.href;
    const postId = currentUrl.split('=')[1];

    const commentData = {
        UserName: document.getElementById('select-user').value,
        Content: document.getElementById('create-comment-content').value,
        PostId: postId
    };

    console.log('Creating post:', commentData);

    try {
        const response = await sendComment(commentData);
        console.log('Comment created:', response);
    } catch (error) {
        console.error('Error creating comment:', error);
    }
});

async function sendComment(commentData) {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/addcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        window.location.reload();

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
