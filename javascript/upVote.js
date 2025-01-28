// document.getElementById('rate-up-1').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const reactionData = {
//         PostId: 26,
//     }

//     console.log('Upvoting post:', reactionData);

//     try {
//         const response = await upVote(reactionData);
//         console.log('Like sent:', response);
//     } catch (error) {
//         console.log('Error liking post:', error);
//     }
// });

export async function upVote(upVote) {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/likepost', {
            method: 'POST',
            headers: {
                'Conten-Type': 'application/json'
            },
            body: JSON.stringify(upVote)
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
