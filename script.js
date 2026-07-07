const polaroidBtn = document.getElementById('polaroidBtn');
const spotifyWidget = document.getElementById('spotifyWidget');
const closeSpotifyBtn = document.getElementById('closeSpotifyBtn');

// Al tocar la Polaroid, el widget de música aparece centrado abajo
polaroidBtn.addEventListener('click', () => {
  spotifyWidget.classList.add('active');
  // Reseteamos la posición al centro por si se movió antes
  spotifyWidget.style.top = '';
  spotifyWidget.style.left = '';
  spotifyWidget.style.right = '';
  spotifyWidget.style.bottom = '15px';
  spotifyWidget.style.transform = 'translateX(-50%) translateY(0) scale(1)';
});

// Al tocar la 'X' de la ventanita, se esconde de nuevo
closeSpotifyBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita conflictos de clics
  spotifyWidget.classList.remove('active');
});

// =========================================================
// 🎛️ LÓGICA PARA HACER EL WIDGET ARRASTRABLE (TOUCH & MOUSE)
// =========================================================
const widgetHeader = document.querySelector('.widget-header');

let isDragging = false;
let startX, startY;
let initialX, initialY;

// Solo se podrá arrastrar desde la barra superior de la ventana († MCR RADIO †)
widgetHeader.addEventListener('pointerdown', (e) => {
  // Evitamos arrastrar si se pulsa el botón de cerrar
  if (e.target === closeSpotifyBtn) return;

  isDragging = true;
  widgetHeader.style.cursor = 'grabbing';
  
  // Desactivamos temporalmente la transformación de centrado CSS para que no interfiera
  spotifyWidget.style.transform = 'none';

  // Obtenemos la posición actual física del widget en la pantalla
  const rect = spotifyWidget.getBoundingClientRect();
  initialX = rect.left;
  initialY = rect.top;

  // Guardamos la posición inicial del puntero/dedo
  startX = e.clientX;
  startY = e.clientY;

  // Fijamos los valores actuales de top y left para empezar a mover desde ahí
  spotifyWidget.style.left = initialX + 'px';
  spotifyWidget.style.top = initialY + 'px';
  spotifyWidget.style.bottom = 'auto';
  spotifyWidget.style.right = 'auto';

  widgetHeader.setPointerCapture(e.pointerId);
});

widgetHeader.addEventListener('pointermove', (e) => {
  if (!isDragging) return;

  // Calculamos cuánto se ha movido el puntero/dedo
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  // Nueva posición calculada
  let newX = initialX + dx;
  let newY = initialY + dy;

  // LÍMITES DE PANTALLA (Para que no se pierda la ventana fuera de los bordes)
  const rect = spotifyWidget.getBoundingClientRect();
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX + rect.width > window.innerWidth) newX = window.innerWidth - rect.width;
  if (newY + rect.height > window.innerHeight) newY = window.innerHeight - rect.height;

  // Aplicamos las nuevas coordenadas reales
  spotifyWidget.style.left = newX + 'px';
  spotifyWidget.style.top = newY + 'px';
});

// Cuando se suelta el clic o se levanta el dedo
const stopDragging = (e) => {
  if (!isDragging) return;
  isDragging = false;
  widgetHeader.style.cursor = 'move';
  widgetHeader.releasePointerCapture(e.pointerId);
};

widgetHeader.addEventListener('pointerup', stopDragging);
widgetHeader.addEventListener('pointercancel', stopDragging);