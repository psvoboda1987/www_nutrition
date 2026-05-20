let params = new URLSearchParams(document.location.search);
let sort = params.get('sort');
if (sort === null || sort === 'DESC') {
    sort = 'ASC';
} else {
    sort = 'DESC';
}

let headerElements = document.querySelectorAll('thead.sortable th');
for (const element of headerElements) {
    element.addEventListener('click', () => {
        const url = new URL(window.location.href);
        url.searchParams.set('orderBy', element.innerText);
        url.searchParams.set('sort', sort);
        window.location.href = url.href;
    });
}

let category = document.getElementById('category');
category.addEventListener('change', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', category.value);
    window.location.href = url.href;
});
