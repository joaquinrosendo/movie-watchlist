const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
let mainContainer = document.getElementById('main-container');
const startExploringMessage = document.getElementById('start-exploring-message');
const errorMessage = document.getElementById('error-search-message');
const moviesContainer = document.getElementById('movies-container');


let displayMovies = (movies) => {

    let promises = [];

    movies.forEach(movie => {
        promises.push(
            fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=e2f87681`)
            .then(res => res.json())
            .then(data => { 
                return `<div class="movie-container" id="movie-container">
                                        <img class="movie-poster" id="movie-poster" src="${data.Poster}"/>
                                        <div class="movie-info">
                                            <div class="movie-header">
                                                <h3 id="movie-title">${data.Title}</h3>
                                                <i class="fa-solid fa-star"></i>
                                                <p id="movie-rating">${data.imdbRating}</p>
                                            </div>
                                            <div class="movie-specs">
                                                <p id="movie-runtime">${data.Runtime}</p>
                                                <p id="movie-genre">${data.Genre}</p>
                                                <div class="add-to-watchlist click-to-add"><i class="fa-solid fa-circle-plus click-to-add"></i>
                                                <p class="add-watchlist click-to-add" id="add-watchlist">Watchlist</p></div>
                                            </div>
                                            <p id="movie-plot-paragraph">${data.Plot}</p>
                                        </div>
                                    </div>`;
            })
        );
        
    });

    Promise.all(promises)
    .then(htmlArray => {
        let html = htmlArray.join('');
        moviesContainer.innerHTML = html;
        moviesContainer.style.display = 'flex'
        startExploringMessage.style.display = 'none';
        errorMessage.style.display = 'none'
        console.log(promises)
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


let searchMovie = () => {
    let movie = searchInput.value;

    fetch(`http://www.omdbapi.com/?s=${movie}&type=movie&apikey=e2f87681`)
    .then(res => res.json())
    .then(data => {
        console.log(data.Response);
        if(data.Response === 'False'){
            startExploringMessage.style.display = 'none';
            moviesContainer.style.display = 'none'
            errorMessage.style.display = 'flex'
        }
        else {
            displayMovies(data.Search);
        }
        
    })
}



searchBtn.addEventListener('click', searchMovie);

searchInput.addEventListener('keydown', event => {
    if(event.key === 'Enter'){
        searchMovie();
    }
})

moviesContainer.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('click-to-add')){
        const movieElement = target.closest(".movie-container");
        const movieTitle = movieElement.querySelector('#movie-title').textContent;
        const movieRating = movieElement.querySelector('#movie-rating').textContent;
        const movieRuntime = movieElement.querySelector('#movie-runtime').textContent;
        const movieGenre = movieElement.querySelector('#movie-genre').textContent;
        const moviePlot = movieElement.querySelector('#movie-plot-paragraph').textContent;
        const moviePosterUrl = movieElement.querySelector('#movie-poster').src;

        console.log(moviePosterUrl)

        localStorage.setItem(movieTitle, JSON.stringify({title: movieTitle, rating: movieRating, runtime: movieRuntime, genre: movieGenre, plot: moviePlot, poster: moviePosterUrl}));
    }
})

