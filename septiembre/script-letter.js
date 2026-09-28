// --- CONFIGURACIÓN DE TU GALERÍA DE IMÁGENES DE SEPTIEMBRE ---
const imagenesSeptiembre = [
  { url: 'fotos/imagen2.jpeg', comentario: 'Se me hizo muy lindo esto JAJAJAJAJA!!' },
  { url: 'fotos/imagen5.jpeg', comentario: '🫶' }
];

let indiceActual = 0;

// Elementos del DOM
const envelopeBtn = document.getElementById('envelopeBtn');
const letterPopup = document.getElementById('letterPopup');
const letterMusic = document.getElementById('letterMusic');

const galleryBtn = document.getElementById('galleryBtn');
const galleryPopup = document.getElementById('galleryPopup');
const activeGalleryImg = document.getElementById('activeGalleryImg');
const activeGalleryComment = document.getElementById('activeGalleryComment');
const imgCounter = document.getElementById('imgCounter');


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


// --- INTERACCIÓN 2: GALERÍA DE IMÁGENES POR TOQUES ---
galleryBtn.addEventListener('click', () => {

  indiceActual = 0;

  cargarImagen();

  galleryPopup.classList.add('active');
});


// Al tocar dentro del popup de la galería,
// pasa a la siguiente o cierra
galleryPopup.addEventListener('click', () => {

  indiceActual++;

  if (indiceActual < imagenesSeptiembre.length) {

    cargarImagen();

  } else {

    // Si ya terminó de mostrar todas, cierra el popup
    galleryPopup.classList.remove('active');
  }
});


// --- FUNCIÓN PARA ACTUALIZAR LA FOTO Y TEXTO ---
function cargarImagen() {

  const fotoFila = imagenesSeptiembre[indiceActual];

  activeGalleryImg.src = fotoFila.url;
  activeGalleryComment.textContent = fotoFila.comentario;

  imgCounter.textContent =
    `${indiceActual + 1} / ${imagenesSeptiembre.length}`;
}