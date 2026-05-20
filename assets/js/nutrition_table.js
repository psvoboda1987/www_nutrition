const json = await fetch('../assets/data/khp.json')
let data = await json.json()
renderCategories(data);

handleCategoryChange();

data = filterDataByCategory(data);

$('#myTable').DataTable({
    data: data,
    columns: [
        { data: 'product_name' },
        { data: 'kcal' },
        { data: 'protein' },
        { data: 'fat' },
        { data: 'carbs' },
        { data: 'fiber' },
        { data: 'glycemic_index' },
        { data: 'cholesterol' }
    ],
    fixedHeader: true,
});

function filterDataByCategory(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        return data.filter(item => item.category === category);
    }
    return data;
}

function handleCategoryChange() {
    const categorySelect = document.getElementById('category');
    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;
        const url = new URL(window.location);
        if (selectedCategory) {
            url.searchParams.set('category', selectedCategory);
        } else {
            url.searchParams.delete('category');
        }
        window.location = url;
    });
}

function renderCategories(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const categorySearch = urlParams.get('category');
    const categories = [...new Set(data.map(item => item.category))];
    for (let category of categories) {
        $('#category').append(`<option value="${category}" ${category === categorySearch ? 'selected' : ''}>${category}</option>`);
    }
}