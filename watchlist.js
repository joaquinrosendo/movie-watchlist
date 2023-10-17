const watchlistMoviesContainer = document.getElementById('watchlist-movies-container');
const emptyWatchlistMessage = document.getElementById('empty-watchlist-message');
const moviesContainer = document.getElementById('watchlist-movies-container');

let displayWatchlist = () => {

    if(localStorage.length){
        emptyWatchlistMessage.style.display = 'none';
    }
    else{
        emptyWatchlistMessage.style.display = 'flex';
    }

    const watchlistMovies = [];
    let html = '';

    for(let i=0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const parsedValue = JSON.parse(value);
        watchlistMovies.push({key, value: parsedValue})
    }

    watchlistMovies.forEach(movie => {

        html += `<div class="movie-container" id="movie-container">
                    <img class="movie-poster" src="${movie.value.poster}"/>
                    <div class="movie-info">
                        <div class="movie-header">
                            <h3 id="movie-title">${movie.value.title}</h3>
                            <i class="fa-solid fa-star"></i>
                            <p id="movie-rating">${movie.value.rating}</p>
                        </div>
                        <div class="movie-specs">
                            <p id="movie-runtime">${movie.value.runtime}</p>
                            <p id="movie-genre">${movie.value.genre}</p>
                            <div class="remove-from-watchlist click-to-remove"><i class="fa-solid fa-circle-minus click-to-remove"></i>
                            <p class="remove-watchlist click-to-remove" id="remove-watchlist">Watchlist</p></div>
                        </div>
                        <p id="movie-plot-paragraph">${movie.value.plot}</p>
                    </div>
                </div>`
    })

    watchlistMoviesContainer.innerHTML = html;

}

displayWatchlist();

moviesContainer.addEventListener('click', event => {
    const target = event.target;

    console.log(target);
    if (target.classList.contains('click-to-remove')){
        const movieElement = target.closest(".movie-container");
        const movieTitle = movieElement.querySelector('#movie-title').textContent;

        console.log(movieTitle);

        localStorage.removeItem(movieTitle);
        
    }

    displayWatchlist();
})


