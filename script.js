const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const transition = document.querySelector('.page-transition');
const resumeWrap = document.getElementById('resumeWrap');

function navigateTo(pageId) {
    const targetPage = document.getElementById(pageId);
    const currentPage = document.querySelector('.page.active');

    if (!targetPage || currentPage === targetPage) return;

    currentPage.classList.remove('active');
    targetPage.classList.add('active');

    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    resumeWrap.classList.toggle('visible', pageId === 'about');
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

document.addEventListener('keydown', (e) => {
    const keyMap = { '1': 'home', '2': 'projects', '3': 'about', '4': 'contact' };

    if (e.altKey && keyMap[e.key]) {
        e.preventDefault();
        navigateTo(keyMap[e.key]);
    }
});

const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = storedTheme || (systemDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const snowflakeContainer = document.getElementById('snowflakes');
const snowflakeChars = ['❄', '❅', '❆', '✦', '✧'];

function createSnowflake() {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    flake.style.left = Math.random() * 100 + '%';
    flake.style.fontSize = (0.5 + Math.random() * 0.6) + 'rem';
    flake.style.animationDuration = (6 + Math.random() * 8) + 's';
    flake.style.animationDelay = Math.random() * 5 + 's';
    snowflakeContainer.appendChild(flake);

    setTimeout(() => flake.remove(), 15000);
}

for (let i = 0; i < 25; i++) {
    setTimeout(createSnowflake, i * 300);
}

setInterval(createSnowflake, 800);
