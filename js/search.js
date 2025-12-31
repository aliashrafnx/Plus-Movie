const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");

let movies = [];

/* Load movies */
fetch("data/movies.json")
  .then(res => res.json())
  .then(data => {
    movies = data.movies;
  });

/* Helpers */
function normalize(text) {
  return text.toLowerCase().trim();
}

/* Search logic */
searchInput.addEventListener("input", () => {
  const query = normalize(searchInput.value);

  if (!query) {
    searchDropdown.style.display = "none";
    return;
  }

  const results = movies.filter(m =>
    normalize(m.title).includes(query)
  );

  renderDropdown(results, query);
});

/* Enter key → search page */
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    window.location.href = `search.html?q=${encodeURIComponent(searchInput.value)}`;
  }
});

/* Render dropdown */
function renderDropdown(results, query) {
  searchDropdown.innerHTML = "";

  if (results.length === 0) {
    searchDropdown.style.display = "none";
    return;
  }

  results.slice(0, 3).forEach(movie => {
    const item = document.createElement("div");
    item.className = "search-item";
    item.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <span>${movie.title}</span>
    `;

    item.onclick = () => {
      window.location.href = `movie.html?id=${movie.id}`;
    };

    searchDropdown.appendChild(item);
  });

  if (results.length > 3) {
    const more = document.createElement("div");
    more.className = "search-more";
    more.textContent = "مشاهده همه نتایج";
    more.onclick = () => {
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    };
    searchDropdown.appendChild(more);
  }

  searchDropdown.style.display = "block";
}

/* Close on outside click */
document.addEventListener("click", e => {
  if (!e.target.closest(".search-container")) {
    searchDropdown.style.display = "none";
  }
});
