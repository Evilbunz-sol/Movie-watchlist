// Global Variables
const results = document.getElementById("content-pane")
const apiKey = "9398c13c"

const savedMovies = JSON.parse(localStorage.getItem("myMovies"))
const myMovies = []

// Watch List Render

function renderWatchlist () {
    if (savedMovies.length) {
        for (let i = 0; i < savedMovies.length; i++) {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${savedMovies[i]}`)
            .then(response => response.json())
            .then(data => {
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
                                    data-removeFromWatchlist=${movieData.imdbID}>
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
    } else {}
}

renderWatchlist()

// REMOVE FROM WATCHLIST 
