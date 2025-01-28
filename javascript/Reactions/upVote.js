export async function upVote(upVote) {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/likepost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(upVote)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok') + response.statusText;
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
