let currentIndex = 0;
let interval;
fetch("data/movies.json")
  .then(res => res.json())
  .then(data => {
    const movies = data.movies;
    const dropdown = document.getElementById("categoryDropdown");
    if (!dropdown) return;

    const categories = new Set();

    movies.forEach(movie => {
      if (Array.isArray(movie.categories)) {
        movie.categories.forEach(cat => categories.add(cat));
      }
    });

    dropdown.innerHTML = "";

    categories.forEach(cat => {
      const a = document.createElement("a");
      a.href = `search.html?category=${encodeURIComponent(cat)}`;
      a.textContent = cat;
      dropdown.appendChild(a);
    });
  });
fetch("./data/movies.json")
  .then(res => res.json())
  .then(data => {
    const movies = data.movies.slice(0, 5);
    const slidesContainer = document.getElementById("slides");

    movies.forEach(movie => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.style.backgroundImage = `url(${movie.banner})`;

      slide.innerHTML = `
        <div class="slide-content">
          <h2>${movie.title}</h2>
          <p>${movie.description}</p>
          <a href="movie.html?id=${movie.id}">مشاهده فیلم</a>
        </div>
      `;

      slidesContainer.appendChild(slide);
    });

    const totalSlides = movies.length;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      slidesContainer.style.transform =
        `translateX(${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
      interval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 6000);
    }

    document.getElementById("nextBtn").onclick = () => {
      clearInterval(interval);
      goToSlide(currentIndex + 1);
      startAutoSlide();
    };

    document.getElementById("prevBtn").onclick = () => {
      clearInterval(interval);
      goToSlide(currentIndex - 1);
      startAutoSlide();
    };

    startAutoSlide();

    // GRID (unchanged, below slider)
    const grid = document.getElementById("moviesGrid");
    data.movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <p>${movie.title}</p>
      `;
      card.onclick = () => {
        location.href = `movie.html?id=${movie.id}`;
      };
      grid.appendChild(card);
    });
  });
fetch("./data/movies.json")
  .then(res => res.json())
  .then(data => {
    const movies = data.movies;

    const likesStore =
      JSON.parse(localStorage.getItem("likes")) || {};

    // inject likes from localStorage
    movies.forEach(m => {
      m.likes = likesStore[m.id] ?? m.likes ?? 0;
    });

    /* ===================== */
    /* NEWEST */
    /* ===================== */
    const newest = [...movies]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 6);

    renderMovies(newest, "newestMovies");

    /* ===================== */
    /* POPULAR */
    /* ===================== */
    const popular = [...movies]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    renderMovies(popular, "popularMovies");

    /* ===================== */
    /* DEFAULT / SUGGESTED */
    /* ===================== */
    renderMovies(movies.slice(0, 6), "moviesGrid");
  });

/* ===================== */
/* RENDER FUNCTION */
/* ===================== */
function renderMovies(movies, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = "";

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
document.querySelectorAll(".draggable").forEach(slider => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", e => {
    isDown = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.2; // سرعت حرکت
    slider.scrollLeft = scrollLeft - walk;
  });

  /* موبایل */
  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", e => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.2;
    slider.scrollLeft = scrollLeft - walk;
  });
});
