document.addEventListener('DOMContentLoaded', () => {
	const songs = [
		{
			id: "1",
			artist: "Beyonce",
			name: "Don't Hurt Yourself",
			song: "./assets/audio/beyonce.mp3",
			img: './assets/img/lemonade.png'
		},
		{
			id: "2",
			artist: "Dua Lipa",
			name: "Don't Start Now",
			song: "./assets/audio/dontstartnow.mp3",
			img: './assets/img/dontstartnow.png'
		}
	];
	const bodyElement = document.body;
	const info = document.querySelector('.audio-player__info');
	const wrapper = document.querySelector('.wrapper');
	const playPause = document.querySelector('.playPause');
	const next = document.querySelector('.nextPrev_next');
	const prev = document.querySelector('.nextPrev_prev');
	const durationElement = document.querySelector('.durationTime');
	const currentTimeElement = document.querySelector('.currentTime');

	const audio = new Audio();
	let isPlay = false;
	let currentSongIndex = 0;

	/*
			console.log('playPause:', playPause);
		console.log('next:', next);
		console.log('prev:', prev);
	*/


	playPause.addEventListener('click', togglePlay);
	next.addEventListener('click', playNextSong);
	prev.addEventListener('click', playPrevSong)

	function togglePlay() {
		if (!isPlay) {
			playPause.classList.add('playPause_pause');
			playAudio();
		} else {
			playPause.classList.remove('playPause_pause');
			pauseAudio();
		}
	}

	function playNextSong() {
		currentSongIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
		updatePlayer(songs[currentSongIndex]);
		isPlay = false;
		togglePlay();
	}

	function playPrevSong() {
		currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
		updatePlayer(songs[currentSongIndex]);
		isPlay = false;
		togglePlay();
	}

	function updatePlayer(song) {
		bodyElement.style.backgroundImage = `url(${song.img})`;
		wrapper.querySelector('.audio-player__img').src = song.img;
		wrapper.querySelector('.audio-player__artist').textContent = song.artist;
		wrapper.querySelector('.audio-player__song').textContent = song.name;
		audio.src = song.song;
	}


	audio.addEventListener('loadedmetadata', () => {
		const duration = audio.duration;
		const minutes = Math.floor(duration / 60);
		const seconds = Math.floor(duration % 60);
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
		durationElement.textContent = `${minutes}:${formattedSeconds}`;
	});

	audio.addEventListener('timeupdate', () => {
		const currentTime = audio.currentTime;
		const minutes = Math.floor(currentTime / 60);
		const seconds = Math.floor(currentTime % 60);
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
		currentTimeElement.textContent = `${minutes}:${formattedSeconds}`;
		
		
		
	})
	
	audio.addEventListener('ended', () => {
		togglePlay();
		setTimeout(playNextSong, 3000);

	})


	function playAudio() {
		audio.currentTime = 0;
		audio.play();
		isPlay = true;
	}

	function pauseAudio() {
		audio.pause();
		isPlay = false;
	}

	updatePlayer(songs[0]);

});