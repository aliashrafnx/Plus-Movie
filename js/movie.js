const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const form = document.getElementById("commentForm");
const input = document.getElementById("commentInput");
const list = document.getElementById("commentsList");

const storageKey = `comments_${movieId}`;

fetch("./data/movies.json")
  .then(res => res.json())
  .then(data => {
    const movie = data.movies.find(m => m.id === movieId);
    if (!movie) return;

    const hero = document.getElementById("movieHero");
    const content = document.getElementById("movieContent");

    hero.style.backgroundImage = `url(${movie.banner})`;

    content.innerHTML = `
      <img class="movie-poster" src="${movie.poster}">
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <div class="movie-meta">سال انتشار: ${movie.year}</div>

        <button id="likeBtn" class="like-btn" >
           <span id="likeCount">0</span><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z" fill="#ff1a47"></path> </g></svg>
        </button>

        <p>${movie.description}</p>
        <a title="پخش" class="play-btn play-btn-color" href="p.html?id=${movie.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg></a>
      <!-- DOWNLOAD -->
      <a title="دانلود" class="download-btn play-btn "
         href="${movie.video}"
         download>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.5 4V17M12.5 17L7 12.2105M12.5 17L18 12.2105" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 21H19" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>     </a>

        </div>
    `;

    /* ====================== */
    /* LIKE SYSTEM (TOGGLE) */
    /* ====================== */

    const likeBtn = document.getElementById("likeBtn");
    const likeCountEl = document.getElementById("likeCount");

    const likesStore =
      JSON.parse(localStorage.getItem("likes")) || {};

    const likedStore =
      JSON.parse(localStorage.getItem("likedMovies")) || {};

    let totalLikes =
      likesStore[movieId] ?? movie.likes ?? 0;

    let liked =
      likedStore[movieId] === true;

    /* INIT */
    likeCountEl.textContent = totalLikes;
    likeBtn.classList.toggle("liked", liked);

    likeBtn.addEventListener("click", () => {
      if (liked) {
        totalLikes = Math.max(0, totalLikes - 1);
        liked = false;
        delete likedStore[movieId];
      } else {
        totalLikes += 1;
        liked = true;
        likedStore[movieId] = true;
      }

      likesStore[movieId] = totalLikes;

      localStorage.setItem("likes", JSON.stringify(likesStore));
      localStorage.setItem("likedMovies", JSON.stringify(likedStore));

      likeCountEl.textContent = totalLikes;
      likeBtn.classList.toggle("liked", liked);
    });
  });

/* ====================== */
/* COMMENTS */
/* ====================== */

function renderComments() {
  list.innerHTML = "";
  const comments = JSON.parse(localStorage.getItem(storageKey)) || [];

  comments.forEach(text => {
    const div = document.createElement("div");
    div.className = "comment";
    div.textContent = text;
    list.appendChild(div);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const comments = JSON.parse(localStorage.getItem(storageKey)) || [];
  comments.unshift(text);

  localStorage.setItem(storageKey, JSON.stringify(comments));
  input.value = "";
  renderComments();
});

renderComments();
