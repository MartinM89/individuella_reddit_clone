import { fetchUsers } from './fetchPostService.js';
import { getLocalStorageData } from './getLocalStorageData.js';

document.addEventListener("DOMContentLoaded", async function () {
    const users = await fetchUsers();
    const userContainer = document.getElementById('select-user');

    users.forEach(user => {
        const userOptions = document.createElement('option');

        userOptions.value = user.username;
        userOptions.textContent = user.username;

        userContainer.appendChild(userOptions);
    });

    getLocalStorageData();
});
