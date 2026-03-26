const player = document.getElementById('main-player');
const muteBtn = document.getElementById('muteBtn');
const songTitle = document.querySelector('.song-title');

document.querySelectorAll('.song-circle').forEach(btn => {
    btn.addEventListener('click', function () {
        const isSameSong = player.src.includes(this.getAttribute('data-src'));

        // Toggle pause if clicking the same song
        if (isSameSong && !player.paused) {
            player.pause();
            this.classList.remove('playing');
            return;
        }

        // Remove playing state from all
        document.querySelectorAll('.song-circle').forEach(b => b.classList.remove('playing'));

        player.src = this.getAttribute('data-src');
        player.load();
        player.play().catch(e => console.log(e));

        this.classList.add('playing');
        songTitle.textContent = this.getAttribute('data-name');
        songTitle.classList.add('active');
    });
});

// Reset circle when song ends
player.addEventListener('ended', () => {
    document.querySelectorAll('.song-circle').forEach(b => b.classList.remove('playing'));
    songTitle.textContent = 'Select a song';
    songTitle.classList.remove('active');
});

// Mute / unmute
muteBtn.addEventListener('click', () => {
    player.muted = !player.muted;
    muteBtn.textContent = player.muted ? '🔇' : '🔊';
});

const originalTitle = document.title;
document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ?
        "Come back :(" :
        originalTitle;
})
