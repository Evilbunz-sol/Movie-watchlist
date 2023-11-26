/* Global Variables */
const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const results = document.getElementById("content-pane")
const apiKey = "9398c13c"

const savedMovies = JSON.parse(localStorage.getItem("myMovies"))
const myMovies = []


/* Button Click: Get Search Results */

searchBtn.addEventListener ("click", function() {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}&type=movie`)
        .then(response => response.json())
        .then(data => {
            let movies = data.Search
            
            if (movies) {
                results.innerHTML = ""
                movies.forEach(function (movie){
                    let movieID = movie.imdbID
                    lookupMovie(movieID)
                })
            } else {
                results.innerHTML = `
                <div class="no-movie-found">
                    <h2> Unable to find what you’re looking for. Please try another search. </h2>
                </div>`
            }
            
        searchInput.value = ""
        
        })    
})

/* Function: Look Up Movie ID */

function lookupMovie(movieID){
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`)
        .then(response => response.json())
        .then(movieData => {
            console.log(movieData)
            renderMovies(movieData)
        })
}

/* Function: Render Search Results */

function renderMovies(movieData) {
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
                    <button class="add-btn" data-addToWatchlist=${movieData.imdbID}>
                        <span>+</span> Watchlist
                    </button>
                </div>
                <div class="movie-text-row-three">
                    <p class="movie-plot">${movieData.Plot}</p>
                </div>
            </div>
        </div>
    `
}


/* Function: Add Movie to Watchlist */

document.addEventListener("click", function(e){
    if (savedMovies) {
        myMovies = savedMovies
    }
    
    if (e.target.dataset.addToWatchlist) {
        if (myMovies.includes(e.target.dataset.addToWatchlist)) {
            return
        } else {
            myMovies.push (e.target.dataset.addToWatchlist)
        }
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
    }
})