const toggle = document.getElementById("themeToggle");
const body = document.body;

// SVG icons
const lightIcon = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.23129 2.24048C9.24338 1.78695 10.1202 2.81145 9.80357 3.70098C8.72924 6.71928 9.38932 10.1474 11.6193 12.3765C13.8606 14.617 17.3114 15.2755 20.3395 14.1819C21.2206 13.8637 22.2173 14.7319 21.7817 15.7199C21.7688 15.7491 21.7558 15.7782 21.7427 15.8074C20.9674 17.5266 19.7272 19.1434 18.1227 20.2274C16.4125 21.3828 14.3957 22.0001 12.3316 22.0001H12.3306C9.93035 21.9975 7.6057 21.1603 5.75517 19.6321C3.90463 18.1039 2.64345 15.9797 2.18793 13.6237C1.73241 11.2677 2.11094 8.82672 3.2586 6.71917C4.34658 4.72121 6.17608 3.16858 8.20153 2.25386L8.23129 2.24048Z" fill="currentColor"/>
</svg>`;

const darkIcon = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/>
  <path d="M12 2V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 21V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M22 12L21 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M3 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M19.0708 4.92969L18.678 5.32252" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M5.32178 18.6777L4.92894 19.0706" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M19.0708 19.0703L18.678 18.6775" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M5.32178 5.32227L4.92894 4.92943" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

// Set initial theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) body.className = savedTheme;

// Set initial icon
toggle.innerHTML = body.className === "dark" ? darkIcon : lightIcon;

// Toggle theme on click
toggle.onclick = () => {
  body.className = body.className === "dark" ? "light" : "dark";
  localStorage.setItem("theme", body.className);

  // Update icon
  toggle.innerHTML = body.className === "dark" ? darkIcon : lightIcon;
};
