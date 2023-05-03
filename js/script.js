const songs = [
    {author: 'NEFFEX', name: "Go!"},
    {author: 'Miley Cyrus', name: "Flowers"},
    {author: 'Lil Nas X & Billy Ray Cyrus feat. Young Thug & Mason Ramsey', name: 'Old Town Road (Remix)'},
    {author: 'Imagine Dragons', name: "Believer"}
];

// MUSIC PLAYER
const player = document.querySelector('.media-player'),
    playBtn = document.querySelector('#playBtn'),
    prevBtn = document.querySelector('#prevBtn'),
    nextBtn = document.querySelector('#nextBtn'),
    progressContainer = document.querySelector('.progress-container'),
    progress = document.querySelector('.progress'),
    song = document.querySelector('.song'),
    songName = document.querySelector('.song-name'),
    songAuthor = document.querySelector('.song-author'),
    songImg = document.querySelector('.song-img'),
    mainPage = document.querySelector('.main-page');



// Default song
let songIndex = 0;

// Init
function loadSong(audio){
    const pathSong = `${audio.name}-${audio.author}`;
    songName.innerHTML = audio.name;
    songAuthor.innerHTML = audio.author;
    songImg.src = `img/${pathSong}.jpg`;
    song.src = `audio/${pathSong}.mp3`;
    progress.style.width = '0%';
}
loadSong(songs[songIndex]);


// Play
function playSong(){
    player.classList.add('play');

    playBtn.classList.remove('play', 'fa-play');
    playBtn.classList.add('fa-pause');

    song.play();
}

// Pause
function pauseSong() {
    player.classList.remove('play');

    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');

    song.pause();
}

// Event for Play Button
playBtn.closest('div').addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');

    isPlaying ? pauseSong() : playSong();
})
window.addEventListener('keydown', (e) => {
    if (e.code === "Space"){
        const isPlaying = player.classList.contains('play');

        isPlaying ? pauseSong() : playSong();
    }
    if(song.currentTime < song.duration && song.currentTime > 0){
        if(e.code === "ArrowRight"){
            song.currentTime += 5;
        }else if(e.code === "ArrowLeft"){
            song.currentTime -= 5;
        }
    }

})

// Next song
function nextSong() {
    if((songIndex + 1) >= songs.length) {
        songIndex = 0
    }else {
        songIndex++
    }

    pauseSong();
    loadSong(songs[songIndex]);
    playSong();
}
nextBtn.closest('div').addEventListener('click', nextSong);

// Prev song
function prevSong(){
    if (songIndex <= 0){
        songIndex = songs.length - 1
    }else {
        songIndex--
    }

    pauseSong();
    loadSong(songs[songIndex]);
    playSong();
}
prevBtn.closest('div').addEventListener('click', prevSong);

// Progress Bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement,
        progressPercent = (currentTime / duration) * 100; // = percent | duration =
    progress.style.width = progressPercent + "%";

    if (progress.style.width === '100%') pauseSong();
}
song.addEventListener('timeupdate', updateProgress);

// Set progress
function setProgress(e){
    const width = this.clientWidth,
        clickX = e.offsetX,
        progressPercent = (+clickX / +width) * 100;
    const duration = song.duration;
    song.currentTime = (duration / 100) * progressPercent;
    playSong();
}
progressContainer.addEventListener('click', setProgress);


// MAIN PAGE
const mainPageSongsList = document.querySelector('.songs-list'),
    toPlayerBtn = document.querySelector('.main-page .arrow-right'),
    circle = document.querySelector('.circle');

function mainPageInit(){
    songs.forEach((songItem, songIndex) => {
        const fullNameSong = `${songItem.name}-${songItem.author}`;

        const songElem = document.createElement('div');
        songElem.innerHTML = `
            <div class="song-item-wrapper">
                <p class="songs-count">${songIndex + 1} </p>
                <img src="img/${fullNameSong}.jpg" class="song-image">
                <div>
                    <p class="song-name">${songItem.name}</p>
                    <p class="song-author">${songItem.author}</p>
                </div>
            </div>
          
        `;
        songElem.classList.add('song-item');

        mainPageSongsList.appendChild(songElem);
    })
}
mainPageInit();

toPlayerBtn.closest('div').addEventListener('click', () => {
    mainPage.style.display = 'none';
    player.classList.add('animate__slideInRight')
    player.style.display = 'block';
})
circle.addEventListener('click', () => {
    player.style.display = 'none';
    player.classList.remove('animate__slideInRight');
    mainPage.style.display = 'block';
})

mainPageSongsList.addEventListener('click', playSelectSong);
function playSelectSong(e){
    const selectElem = e.target.closest('.song-item'),
        selectSongName = selectElem.querySelector('.song-name').textContent;

    songs.forEach((item, index) => {
        if(item.name === selectSongName){
            songIndex = index;
        }
    })
    mainPage.style.display = 'none';
    player.classList.add('animate__slideInRight')
    player.style.display = 'block';

    loadSong(songs[songIndex]);
    playSong();
}