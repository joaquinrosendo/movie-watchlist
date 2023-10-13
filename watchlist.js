const watchlistMoviesContainer = document.getElementById('watchlist-movies-container');
const emptyWatchlistMessage = document.getElementById('empty-watchlist-message');

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
                            <div class="add-to-watchlist click-to-add"><i class="fa-solid fa-circle-plus click-to-add"></i>
                            <p class="add-watchlist click-to-add" id="add-watchlist">Watchlist</p></div>
                        </div>
                        <p id="movie-plot-paragraph">${movie.value.plot}</p>
                    </div>
                </div>`
    })

    watchlistMoviesContainer.innerHTML = html;

}

displayWatchlist();
