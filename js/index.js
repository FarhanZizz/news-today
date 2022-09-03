fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => categoryMaker(data.data.news_category))

function categoryMaker(categories) {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="showNews('${category.category_id}')" class="btn btn-light fw-semibold"> ${category.category_name} </button>
        `
        categoryContainer.appendChild(div)
    }
}
function showNews(id) {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => console.log("clicked"))
}