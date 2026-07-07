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
// 🎛️ LÓGICA ARRASTRABLE OPTIMIZADA PARA MÓVIL Y PC
// =========================================================
const widgetHeader = document.querySelector('.widget-header');

let isDragging = false;
let startX, startY;
let initialX, initialY;

widgetHeader.addEventListener('pointerdown', (e) => {
  // Evitamos arrastrar si se pulsa el botón de cerrar
  if (e.target === closeSpotifyBtn) return;

  isDragging = true;
  widgetHeader.style.cursor = 'grabbing';
  
  // Desactivamos temporalmente la transformación de centrado CSS
  spotifyWidget.style.transform = 'none';

  // Obtenemos la posición física actual del widget
  const rect = spotifyWidget.getBoundingClientRect();
  initialX = rect.left;
  initialY = rect.top;

  // Guardamos la posición inicial del puntero o dedo
  startX = e.clientX;
  startY = e.clientY;

  // Fijamos los valores actuales de top y left para la transición suave
  spotifyWidget.style.left = initialX + 'px';
  spotifyWidget.style.top = initialY + 'px';
  spotifyWidget.style.bottom = 'auto';
  spotifyWidget.style.right = 'auto';

  // Captura el puntero (hace que el arrastre sea súper fluido y no se pierda al mover rápido)
  widgetHeader.setPointerCapture(e.pointerId);
});

widgetHeader.addEventListener('pointermove', (e) => {
  if (!isDragging) return;

  // Detiene cualquier comportamiento táctil por defecto del navegador (como el scroll)
  e.preventDefault();

  // Calculamos cuánto se ha desplazado el dedo/mouse
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  // Nueva posición calculada
  let newX = initialX + dx;
  let newY = initialY + dy;

  // LÍMITES DE PANTALLA (Protección para que no se salga de los bordes)
  const rect = spotifyWidget.getBoundingClientRect();
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX + rect.width > window.innerWidth) newX = window.innerWidth - rect.width;
  if (newY + rect.height > window.innerHeight) newY = window.innerHeight - rect.height;

  // Aplicamos las nuevas coordenadas en tiempo real
  spotifyWidget.style.left = newX + 'px';
  spotifyWidget.style.top = newY + 'px';
});

// Al levantar el dedo o soltar el clic
const stopDragging = (e) => {
  if (!isDragging) return;
  isDragging = false;
  widgetHeader.style.cursor = 'move';
  widgetHeader.releasePointerCapture(e.pointerId);
};

widgetHeader.addEventListener('pointerup', stopDragging);
widgetHeader.addEventListener('pointercancel', stopDragging);