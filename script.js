const polaroidBtn = document.getElementById('polaroidBtn');
const spotifyWidget = document.getElementById('spotifyWidget');
const closeSpotifyBtn = document.getElementById('closeSpotifyBtn');

// Al tocar la Polaroid, el widget de música aparece en la esquina
polaroidBtn.addEventListener('click', () => {
  spotifyWidget.classList.add('active');
});

// Al tocar la 'X' de la ventanita, se esconde de nuevo
closeSpotifyBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita conflictos de clics
  spotifyWidget.classList.remove('active');
});