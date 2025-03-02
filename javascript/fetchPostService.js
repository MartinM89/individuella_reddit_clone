export async function fetchPost(postId) {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/getpost?id=' + postId);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function fetchAllPosts() {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/getallposts');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const posts = await response.json();
        return posts.$values;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function fetchSubReddits() {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/getsubreddits')
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const subReddits = await response.json();
        return subReddits.$values;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/getusers')
        if (!response.ok) {
            throw new error('Network response was not ok ' + response.statusText);
        }
        const users = await response.json();
        return users.$values;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
