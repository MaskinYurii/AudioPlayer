const songs = [
    {author: 'NEFFEX', name: "Go!"},
    {author: 'Miley Cyrus', name: "Flowers"},
    {author: 'Lil Nas X & Billy Ray Cyrus feat. Young Thug & Mason Ramsey', name: 'Old Town Road (Remix)'},
    {author: 'Imagine Dragons', name: "Believer"}
];

const player = document.querySelector('.media-player'),
    playBtn = document.querySelector('#playBtn'),
    prevBtn = document.querySelector('#prevBtn'),
    nextBtn = document.querySelector('#nextBtn'),
    progressContainer = document.querySelector('.progress-container'),
    progress = document.querySelector('.progress'),
    song = document.querySelector('.song'),
    songName = document.querySelector('.song-name'),
    songAuthor = document.querySelector('.song-author'),
    songImg = document.querySelector('.song-img');

// Default song
let songIndex = 0;

// Init
function loadSong(audio){
    const pathSong = `${audio.name}-${audio.author}`;
    songName.innerHTML = audio.name;
    songAuthor.innerHTML = audio.author;
    songImg.src = `img/${pathSong}.jpg`;
    song.src = `audio/${pathSong}.mp3`;
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

   if(isPlaying){
       pauseSong();
   }else{
       playSong();
   }
})

// Next song
function nextSong() {
    if((songIndex + 1) >= songs.length){
        songIndex = 0
    }else{
        songIndex++;
    }
    pauseSong();
    loadSong(songs[songIndex])
}
nextBtn.closest('div').addEventListener('click', nextSong);

// Prev song
function prevSong(){
    if(songIndex <= 0){
       songIndex = songs.length - 1
    }else{
        songIndex--;
    }
    pauseSong();
    loadSong(songs[songIndex]);
}
prevBtn.closest('div').addEventListener('click', prevSong);

// Progress Bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement,
        progressPercent = (currentTime / duration) * 100; // = percent | duration =
    progress.style.width = progressPercent + "%";
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