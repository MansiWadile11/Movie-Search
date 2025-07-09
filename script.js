const apiKey = "f51d8855";

document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchMovies();
});

function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("Please enter a movie name.");
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
    .then(res => res.json())
    .then(data => {
      const movieList = document.getElementById("movieList");
      movieList.innerHTML = "";

      if (data.Response === "False") {
        movieList.innerHTML = `<p>${data.Error}</p>`;
        return;
      }

      data.Search.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=No+Image"}" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `;
        movieCard.onclick = () => {
          localStorage.setItem("lastSearch", query);
          window.location.href = `details.html?id=${movie.imdbID}`;
        };
        movieList.appendChild(movieCard);
      });
    })
    .catch(() => {
      document.getElementById("movieList").innerHTML = "<p>Something went wrong. Try again later.</p>";
    });
}

// Bonus: show default or last searched movie list
window.onload = () => {
  const lastSearch = localStorage.getItem("lastSearch") || "Avengers";
  document.getElementById("searchInput").value = lastSearch;
  searchMovies();
};