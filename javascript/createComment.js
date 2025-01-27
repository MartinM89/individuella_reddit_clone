document.getElementById('create-comment-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const commentData = {
        UserName: document.getElementById('select-user').value,
        Content: document.getElementById('create-comment-content').value,
        UserId: document.getElementById('select-user').value,
        // PostId: document.getElementById('select-post').value
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
        const response = await fetch('add correct link to create comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
