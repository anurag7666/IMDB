// Global variables
let searchResults = [];
let favouriteMovies = [];

// API request function to search for movies
async function searchMovies(query) {
  const response = await fetch(`https://api.example.com/search?q=${query}`);
  const data = await response.json();
  return data.results;
}

// Display search results on the home page
function displaySearchResults(results) {
  const searchResultsList = document.getElementById('searchResults');
  searchResultsList.innerHTML = '';
  
  results.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `${movie.title} <button class="btn btn-primary btn-sm addToFavourites">Add to Favourites</button>`;
    searchResultsList.appendChild(li);
  });
  
  const addToFavouritesButtons = document.getElementsByClassName('addToFavourites');
  Array.from(addToFavouritesButtons).forEach((button, index) => {
    button.addEventListener('click', () => addToFavourites(results[index]));
  });
}

// Add a movie to the favourites list
function addToFavourites(movie) {
  if (!favouriteMovies.some(favMovie => favMovie.id === movie.id)) {
    favouriteMovies.push(movie);
    updateFavouriteMovies();
  }
}

// Update the list of favourite movies on the home page
function updateFavouriteMovies() {
  const favouriteMoviesList = document.getElementById('favouriteMovies');
  favouriteMoviesList.innerHTML = '';

  favouriteMovies.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `${movie.title} <button class="btn btn-danger btn-sm removeFromFavourites">Remove from Favourites</button>`;
    favouriteMoviesList.appendChild(li);
  });

  const removeFromFavouritesButtons = document.getElementsByClassName('removeFromFavourites');
  Array.from(removeFromFavouritesButtons).forEach((button, index) => {
    button.addEventListener('click', () => removeFromFavourites(index));
  });
}

// Remove a movie from the favourites list
function removeFromFavourites(index) {
  favouriteMovies.splice(index, 1);
  updateFavouriteMovies();
}

// Display movie details on the movie page
function displayMovieDetails(movie) {
  const moviePage = document.getElementById('moviePage');
  moviePage.innerHTML = `
    <h2>${movie.title}
