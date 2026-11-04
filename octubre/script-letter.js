// Elementos del DOM
const envelopeBtn = document.getElementById('envelopeBtn');
const letterPopup = document.getElementById('letterPopup');
const letterMusic = document.getElementById('letterMusic');


// --- INTERACCIÓN 1: ABRIR / CERRAR CARTA ---
envelopeBtn.addEventListener('click', () => {

  // Abre la carta
  letterPopup.classList.add('active');

  // Reproduce la canción
  letterMusic.currentTime = 0;
  letterMusic.play().catch(error => {
    console.log('No se pudo reproducir automáticamente la canción:', error);
  });
});


// Cerrar carta
letterPopup.addEventListener('click', () => {

  letterPopup.classList.remove('active');

  // Detiene la canción
  letterMusic.pause();
  letterMusic.currentTime = 0;
});

