// Global Variables
const results = document.getElementById("content-pane")
const apiKey = "9398c13c"

const myMovies = JSON.parse(localStorage.getItem("myMovies")) || []

// Watch List Render

function renderWatchlist () {
    if (myMovies.length) {
        for (let i = 0; i < myMovies.length; i++) {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${myMovies[i]}`)
            .then(response => response.json())
            .then(movieData => {
                results.innerHTML += `
                    <div class="movie-container">
                        <div class="movie-poster">
                            ${
                                movieData.Poster !== "N/A" ? `<img src="${movieData.Poster}"/>`
                                : `<p class="poster-unavailable">Not Available</p>`
                            }
                        </div>
                        
                        <div class="movie-text">
                            <div class="movie-text-row-one">
                                <h2 class="movie-title">${movieData.Title}</h2>
                                <img src="images/star-icon.png" class="star-icon"/>
                                <p class="movie-rating">${movieData.imdbRating}</p>
                            </div>     
                            <div class="movie-text-row-two">
                                <p class="movie-runtime">${movieData.Runtime}</p>
                                <p class="movie-genre">${movieData.Genre}</p>
                                <button 
                                    class="remove-btn" 
                                    data-remove=${movieData.imdbID}>
                                    <span>-</span> Remove
                                </button>
                            </div>                 
                            <div class="movie-text-row-three">
                                <p class="movie-plot">${movieData.Plot}</p>
                            </div>
                        
                        </div>
                    </div>
                `
            })
        }
    } else {
        results.innerHTML = `
        <section class="flex watchlist-default">
            <h2>Your watchlist is looking a little empty...</h2>
            <a class="watchlist-link" href="index.html"> 
            <span>+</span> Let’s add some movies! </a>
        </section>`
    }
}

renderWatchlist()

// REMOVE FROM WATCHLIST 
document.addEventListener('click', function(e){ 
    if(e.target.dataset.remove) {
        myMovies.splice(myMovies.indexOf(e.target.dataset.remove), 1)
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
        results.innerHTML = ""
        renderWatchlist()
    }
})