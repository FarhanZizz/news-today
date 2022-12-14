// Fetching Categories & showing them as Buttons 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => categoryMaker(data.data.news_category))
    .catch((error) => { console.error('Error:', error); })

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
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => news(data.data))
        .catch((error) => { console.error('Error:', error); });
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
            const div = document.createElement("div");
            div.classList.add("card", "my-3");
            // error handler for when authorname or newsviews data has no value  
            let authorName = news.author.name;
            let newsViews = news.total_view;
            let publishDate = news.author.published_date
            if (authorName === "" || authorName == null) {
                authorName = "No Data Found"
            }
            if (newsViews === "" || newsViews == null) {
                newsViews = "No Data Found"
            }
            if (publishDate === "" || publishDate == null) {
                publishDate = "No Data Found"
            }
            div.innerHTML = `
            <div class="row align-items-center rounded">
                <div class="col-12 col-lg-5">
                    <img src="${news.image_url}" class=" img-fluid rounded">
                </div>
                <div class="col-12 col-lg-7">
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
                            ????${newsViews}
                         </div>
                         <div>                   <!-- Modal BUTTON -->     
                           <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${news._id}">Show details</button>
                         </div>

                    </div>
                </div >
            </div >             <!-- Modal -->
            <div class="modal fade" id="exampleModal${news._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${news.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h5>Publisher : ${authorName}</h5>
                                <h5>Published : ${publishDate}</h5>
                                <h5>Views : ${newsViews}<h5>
                                <h5>Ratings : ${news.rating.number}/ 5<h5>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> `
            newsContainer.appendChild(div);
        }
        toggleSpinner(false);
    }
}
// SPINNER
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove("d-none");
    }
    else {
        spinner.classList.add("d-none");
    }
}