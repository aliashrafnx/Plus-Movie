const grid = document.getElementById("resultsGrid");
const title = document.getElementById("resultTitle");

const params = new URLSearchParams(window.location.search);
const query = params.get("q");
const sort = params.get("sort");
const category = params.get("category");

fetch("data/movies.json")
  .then(res => res.json())
  .then(data => {
    let movies = data.movies;
const likesStore =
  JSON.parse(localStorage.getItem("likes")) || {};

movies.forEach(m => {
  m.likes = likesStore[m.id] ?? m.likes ?? 0;
});
    /* SEARCH (by title) */
    if (query) {
      const q = query.toLowerCase();
      movies = movies.filter(m =>
        m.title.toLowerCase().includes(q)
      );
      title.textContent = `نتایج جستجو برای "${query}"`;
    }

    /* CATEGORY FILTER */
    if (category) {
      movies = movies.filter(m =>
        Array.isArray(m.categories) &&
        m.categories.includes(category)
      );
      title.textContent = `دسته‌بندی: ${category}`;
    }

    /* SORTING */
    if (sort === "popular") {
      movies.sort((a, b) => b.likes - a.likes);
      title.textContent = "محبوب‌ترین‌ها";
    }

    if (sort === "newest") {
      movies.sort((a, b) => b.year - a.year);
      title.textContent = "جدیدترین‌ها";
    }

    renderMovies(movies);
  })
  .catch(err => {
    console.error("Error loading movies:", err);
    grid.innerHTML = "<p>خطا در بارگذاری اطلاعات</p>";
  });

function renderMovies(movies) {
  grid.innerHTML = "";

  if (movies.length === 0) {
    grid.innerHTML = "<p>موردی یافت نشد</p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    card.onclick = () => {
      window.location.href = `movie.html?id=${movie.id}`;
    };

    grid.appendChild(card);
  });
}
