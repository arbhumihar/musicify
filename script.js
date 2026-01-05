const audio = document.getElementById("player");
const currentSong = document.getElementById("currentSong");

function playSong(path, title) {
  audio.src = path;
  audio.play();
  currentSong.innerText = title;
}

function addToPlaylist(title) {
  const li = document.createElement("li");
  li.innerText = title;
  document.getElementById("playlist").appendChild(li);
}

// DARK MODE
document.getElementById("modeBtn").onclick = () => {
    document.body.classList.toggle("light");
};

// SIDEBAR MENU (MOBILE)
function toggleMenu() {
    let bar = document.getElementById("sidebar");
    bar.style.right = bar.style.right === "0px" ? "-200px" : "0px";
}

// LIVE SEARCH
document.getElementById("search").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();

    document.querySelectorAll(".song-card").forEach(card => {
        let name = card.getAttribute("data-title").toLowerCase();
        card.style.display = name.includes(value) ? "block" : "none";
    });
});

// PLAYLIST SYSTEM
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

function addToPlaylist(song) {
    playlist.push(song);
    savePlaylist();
}

function savePlaylist() {
    localStorage.setItem("playlist", JSON.stringify(playlist));
    loadPlaylist();
}

function loadPlaylist() {
    let list = document.getElementById("playlist");
    list.innerHTML = "";

    playlist.forEach(s => {
        let li = document.createElement("li");
        li.textContent = s;
        list.appendChild(li);
    });
}

loadPlaylist();

// PLAYER PROGRESS BAR
let player = document.getElementById("player");
let seek = document.getElementById("seek");

player.addEventListener("timeupdate", () => {
    seek.value = (player.currentTime / player.duration) * 100;
});

seek.addEventListener("input", () => {
    player.currentTime = (seek.value * player.duration) / 100;
});


