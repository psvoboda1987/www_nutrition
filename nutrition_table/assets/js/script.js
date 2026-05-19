let params = new URLSearchParams(document.location.search);
let sort = params.get('sort');
if (sort === null || sort === 'DESC') {
    sort = 'ASC';
} else {
    sort = 'DESC';
}

let headerElements = document.querySelectorAll('thead.sortable th');
for (const element of headerElements) {
    element.addEventListener('click', ()=> {
        window.location.search = `?orderBy=${element.innerText}&sort=${sort}`;
    });
}