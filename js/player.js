const video = document.getElementById("video");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const time = document.getElementById("time");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const title = document.getElementById("movieTitle");
const backBtn = document.getElementById("backBtn");
const root = document.getElementById("playerRoot");
const forwardBtn = document.getElementById("forwardBtn");
const backwardBtn = document.getElementById("backwardBtn");
const muteIcon="<svg viewBox='-0.5 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
const mutedIcon="<svg viewBox='-0.5 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M10.9395 17.72C12.9395 19.5 15.3895 20.72 16.5495 20.33C18.6495 19.55 18.9995 15.3299 18.9995 12.4099C18.9995 11.5999 18.9995 10.68 18.8895 9.77002' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M18.1292 6.28008C18.0012 5.89129 17.795 5.53273 17.5233 5.22661C17.2516 4.9205 16.9201 4.67327 16.5493 4.50005C15.3193 4.04005 12.7093 5.49996 10.5493 7.40996H8.94922C7.88835 7.40996 6.87093 7.83145 6.12079 8.58159C5.37064 9.33174 4.94922 10.3491 4.94922 11.41V13.41C4.9489 14.1811 5.17151 14.936 5.59021 15.5835C6.00892 16.2311 6.60585 16.7438 7.3092 17.06' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M22 2.42004L2 22.42' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const playicon='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg>';
const pauseicon='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" stroke="#ffffff" stroke-width="1.5"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" stroke="#ffffff" stroke-width="1.5"></path> </g></svg>';
const muteBtn = document.getElementById("muteBtn");
let lastVolume = video.volume || 0.8;

/* LOAD MOVIE */
fetch("./data/movies.json")
  .then(r => r.json())
  .then(data => {
    const movie = data.movies.find(m => m.id === movieId);
    if (!movie) return;

    video.src = movie.video;
    title.textContent = movie.title;
    backBtn.href = `movie.html?id=${movie.id}`;
  });

/* USER PLAY (SAFE) */
playBtn.addEventListener("click", togglePlay);

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


/* STATE */
video.addEventListener("play", () => playBtn.innerHTML = pauseicon);
video.addEventListener("pause", () => playBtn.innerHTML = playicon);
document.addEventListener("keydown", (e) => {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlay();
      break;

    case "ArrowRight":
      video.currentTime = Math.min(video.currentTime + 10, video.duration);
      break;

    case "ArrowLeft":
      video.currentTime = Math.max(video.currentTime - 10, 0);
      break;

    case "ArrowUp":
      e.preventDefault();
      video.volume = Math.min(video.volume + 0.05, 1);
      volume.value = video.volume;
      updateVolume();
      break;

    case "ArrowDown":
      e.preventDefault();
      video.volume = Math.max(video.volume - 0.05, 0);
      volume.value = video.volume;
      updateVolume();
      break;

    case "KeyF":
      fullscreenBtn.click();
      break;
  }
});
muteBtn.addEventListener("click", () => {
  if (video.volume > 0) {
    lastVolume = video.volume;
    video.volume = 0;
    volume.value = 0;
    muteBtn.innerHTML = mutedIcon;
  } else {
    video.volume = lastVolume;
    volume.value = lastVolume;
    muteBtn.innerHTML = muteIcon; 
  }
  updateVolume();
});

/* METADATA */
video.addEventListener("loadedmetadata", () => {
  progress.max = Math.floor(video.duration);
});

/* TIME UPDATE */
video.addEventListener("timeupdate", () => {
  if (!progress.dragging) {
    progress.value = Math.floor(video.currentTime);
    updateProgress();
  }

  time.textContent =
      format(video.duration)+ " / " +format(video.currentTime);
});

forwardBtn.addEventListener("click", () => {
  video.currentTime = Math.min(video.currentTime + 10, video.duration);
});

backwardBtn.addEventListener("click", () => {
  video.currentTime = Math.max(video.currentTime - 10, 0);
});

/* SEEK */
progress.addEventListener("mousedown", () => progress.dragging = true);
progress.addEventListener("mouseup", () => {
  progress.dragging = false;
  video.currentTime = progress.value;
});

progress.addEventListener("input", updateProgress);

/* VOLUME */
volume.value = 0.8;
video.volume = 0.8;
updateVolume();
volume.addEventListener("input", () => {
  video.volume = volume.value;
  muteBtn.innerHTML = video.volume === 0 ? mutedIcon : muteIcon;
  updateVolume();
});

/* FULLSCREEN */
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    root.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

function updateProgress() {
  const percent = (progress.value / progress.max) * 100 || 0;

  progress.style.background = `
    linear-gradient(
      to right,
      #8de9f0ff ${percent}%,
      rgba(255,255,255,0.3) ${percent}%
    )
  `;
}

function updateVolume() {
  const percent = volume.value * 100;

  volume.style.background = `
    linear-gradient(
      to right,
      #8de9f0ff ${percent}%,
      rgba(255,255,255,0.3) ${percent}%
    )
  `;
}

function format(seconds = 0) {
  if (!isFinite(seconds)) return "00:00:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return (
    h.toString().padStart(2, "0") + ":" +
    m.toString().padStart(2, "0") + ":" +
    s.toString().padStart(2, "0")
  );
}
//idle 

let hideTimeout;

function showControls() {
  controls.classList.remove("hide");
  playerTop.classList.remove("hide");
  clearTimeout(hideTimeout);

  if (!video.paused) {
    hideTimeout = setTimeout(() => {
      controls.classList.add("hide");
      playerTop.classList.add("hide");
    }, 2000);
  }
}

root.addEventListener("mousemove", showControls);
video.addEventListener("play", showControls);
video.addEventListener("pause", () => {
  controls.classList.remove("hide");
});
const centerPlay = document.getElementById("centerPlay");

centerPlay.addEventListener("click", togglePlay);

video.addEventListener("play", () => {
  centerPlay.classList.remove("show");
});

video.addEventListener("pause", () => {
  centerPlay.innerHTML = playicon;
  centerPlay.classList.add("show");
});

video.addEventListener("click", togglePlay);

function animateCenter() {
  centerPlay.classList.add("animate");
  setTimeout(() => centerPlay.classList.remove("animate"), 200);
}

video.addEventListener("play", animateCenter);
video.addEventListener("pause", animateCenter);
video.addEventListener("dblclick", (e) => {
  const rect = video.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const half = rect.width / 2;

  if (clickX > half) {
    // right side → forward
    video.currentTime = Math.min(video.currentTime + 10, video.duration);
  } else {
    // left side → backward
    video.currentTime = Math.max(video.currentTime - 10, 0);
  }
});