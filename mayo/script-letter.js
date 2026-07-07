// --- CONFIGURACIÓN DE TU GALERÍA DE IMÁGENES DE MAYO ---
const imagenesMayo = [
  { url: 'fotos/juego1.png', comentario: 'Cuando se si jugabamos roblox, no como ahora' },
  { url: 'fotos/juego2.png', comentario: 'Cuando se si jugabamos roblox, no como ahora' },
  { url: 'fotos/juego3.png', comentario: 'Cuando se si jugabamos roblox, no como ahora' },
  { url: 'fotos/juego4.png', comentario: 'Estaba bonita esa montaña' }
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
  
  if (indiceActual < imagenesMayo.length) {
    cargarImagen();
  } else {
    // Si ya terminó de mostrar todas, cierra el popup
    galleryPopup.classList.remove('active');
  }
});

// Función para actualizar la foto y textos del popup
function cargarImagen() {
  const fotoFila = imagenesMayo[indiceActual];
  activeGalleryImg.src = fotoFila.url;
  activeGalleryComment.textContent = fotoFila.comentario;
  imgCounter.textContent = `${indiceActual + 1} / ${imagenesMayo.length}`;
}