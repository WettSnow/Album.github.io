// --- CONFIGURACIÓN DE TU GALERÍA DE IMÁGENES DE JULIO ---
const imagenesJulio = [
  { url: 'fotos/imagen1.png', comentario: 'Este fue un lugar muy bonito' },
  { url: 'fotos/imagen2.png', comentario: 'Mi hada xd JAJAJAJAJA' },
  { url: 'fotos/imagen3.png', comentario: 'Me encanta esta' }
];

let indiceActual = 0;

// Elementos del DOM
const envelopeBtn = document.getElementById('envelopeBtn');
const letterPopup = document.getElementById('letterPopup');
const galleryBtn = document.getElementById('galleryBtn');
const galleryPopup = document.getElementById('galleryPopup');
const activeGalleryImg = document.getElementById('activeGalleryImg');
const activeGalleryComment = document.getElementById('activeGalleryComment');
const imgCounter = document.getElementById('imgCounter');

// --- INTERACCIÓN 1: ABRIR / CERRAR CARTA ---
envelopeBtn.addEventListener('click', () => {
  letterPopup.classList.add('active');
});

letterPopup.addEventListener('click', () => {
  letterPopup.classList.remove('active');
});

// --- INTERACCIÓN 2: GALERÍA DE IMÁGENES POR TOQUES ---
galleryBtn.addEventListener('click', () => {
  indiceActual = 0; // Reinicia al primer elemento al abrir
  cargarImagen();
  galleryPopup.classList.add('active');
});

// Al tocar dentro del popup de la galería, pasa a la siguiente o cierra
galleryPopup.addEventListener('click', () => {
  indiceActual++;
  
  if (indiceActual < imagenesJulio.length) {
    cargarImagen();
  } else {
    // Si ya terminó de mostrar todas, cierra el popup
    galleryPopup.classList.remove('active');
  }
});

// Función para actualizar la foto y textos del popup
function cargarImagen() {
  const fotoFila = imagenesJulio[indiceActual];
  activeGalleryImg.src = fotoFila.url;
  activeGalleryComment.textContent = fotoFila.comentario;
  imgCounter.textContent = `${indiceActual + 1} / ${imagenesJulio.length}`;
}