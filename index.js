const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mainContainer = document.getElementsByTagName('main');

let displayMovies = () => {
    mainContainer.innerHtml =
    `<div class="movie-container">
        <img class="movie-poster"/>
        <div class="movie-info">
            <div class="movie-header">
                <h3 id="movie-title"></h3>
                <i class="fa-solid fa-star"></i>
                <p id="movie-rating"></p>
            </div>
            <div class="movie-specs">
                <p id="movie-runtime"></p>
                <p id="movie-genre"></p>
                <p id="add-watchlist"></p>
            </div>
            <p id="movie-plot-paragraph"></p>
        </div>
    </div>`
}

let searchMovie = () => {
    let movie = searchInput.value;

    fetch(`http://www.omdbapi.com/?t=${movie}&apikey=e2f87681`)
    .then(res => res.json())
    .then(data => console.log(data))
}

searchBtn.addEventListener('click', searchMovie);

displayMovies();