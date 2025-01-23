// document.getElementById('post-preview').addEventListener('click', function () {
//     const postPreview = document.getElementById('post-preview');
//     let isOpen = false;

//     postPreview.addEventListener('click', function () {
//         if (isOpen) {
//             const pElement = document.querySelector('#post-preview + p');
//             if (pElement) {
//                 pElement.remove();
//             }
//             isOpen = false;
//         } else {
//             const pElement = document.createElement('p');
//             pElement.textContent = 'This is the post content.';
//             postPreview.insertAdjacentElement('afterend', pElement);
//             isOpen = true;
//         }
//     });
// });

document.querySelectorAll('.post-preview').forEach(postPreview => {
    let isOpen = false;

    console.log(isOpen);

    postPreview.addEventListener('click', function () {
        if (isOpen) {
            const pElement = postPreview.nextElementSibling;
            if (pElement && pElement.tagName === 'P') {
                pElement.remove();
            }
            isOpen = false;
        }
        // else {
        //     const pElement = document.createElement('p');
        //     pElement.classList.add('post-preview-content');
        //     pElement.textContent = 'This is the post content.'; // Replace with actual content
        //     postPreview.insertAdjacentElement('afterend', pElement);
        //     isOpen = true;
        // }
    });
});
