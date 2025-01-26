export async function fetchPost() {
    try {
        const response = await fetch('http://localhost:5049/api/postgrespost/getpost?id=1');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const post = await response.json();
        console.log(post);
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
        console.log(posts);
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
        console.log(subReddits);
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
        console.log(users);
        return users.$values;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
