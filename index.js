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
                                        <img class="movie-poster" src="${data.Poster}"/>
                                        <div class="movie-info">
                                            <div class="movie-header">
                                                <h3 id="movie-title">${data.Title}</h3>
                                                <i class="fa-solid fa-star"></i>
                                                <p id="movie-rating">${data.imdbRating}</p>
                                            </div>
                                            <div class="movie-specs">
                                                <p id="movie-runtime">${data.Runtime}</p>
                                                <p id="movie-genre">${data.Genre}</p>
                                                <a class="add-to-watchlist"><i class="fa-solid fa-circle-plus"></i>
                                                <p id="add-watchlist">Watchlist</p></a>
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
