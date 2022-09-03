// Fetching Categories & showing them as Buttons 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => categoryMaker(data.data.news_category))

const categoryMaker = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="showNews('${category.category_id}')" class="btn btn-light fw-semibold"> ${category.category_name}</button>`
        categoryContainer.appendChild(div)
    }
}
// Fetching Category news and showing them
const showNews = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => news(data.data))


    const news = (data) => {
        // showing how many news does each category have 
        const newsCount = document.getElementById('news-count')
        newsCount.innerText = `${data.length} Items Found For Selected Category `
        // sorts the data array by views in decending order
        data.sort((a, b) => { return b.total_view - a.total_view; });
        // creating a new Element with the data inside and appending it 
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';
        for (const news of data) {
            console.log(news)
            const div = document.createElement("div");
            div.classList.add("card", "my-3");
            // error handler for when authorname or newsviews data has no value  
            let authorName = news.author.name;
            let newsViews = news.total_view;
            if (authorName === "" || authorName == null) {
                authorName = "No Data Found"
            }
            if (newsViews === "" || newsViews == null) {
                newsViews = "No Data Found"
            }
            div.innerHTML = `
            <div class="d-flex justify-content-around align-items-center rounded">
                <div class="w-75">
                    <img src="${news.image_url}" class=" img-fluid rounded">
                </div>
                <div class="">
                    <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 200)}...</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-around">
                        <div class="mx-3">
                        <img style="width: 40px; border-radius: 50%" class="mx-2" src="${news.author.img}">
                             <span>${authorName}</span >
                         </div >
                    
                         <div>
                         ★${news.rating.number}/5
                         </div>
                         <div>                         
                            👁${newsViews}
                         </div>
                    </div>
                </div >
            </div > `
            newsContainer.appendChild(div);
        }
    }
}