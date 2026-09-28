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





























// =========================================================
// 🔒 CONTADOR DE SEPTIEMBRE
// Se desbloquea automáticamente el 1 de octubre a las 00:00
// =========================================================

const septemberCard = document.getElementById('septemberCard');
const septemberStatus = document.getElementById('septemberStatus');
const septemberCountdown = document.getElementById('septemberCountdown');

const countdownDays = document.getElementById('countdownDays');
const countdownHours = document.getElementById('countdownHours');
const countdownMinutes = document.getElementById('countdownMinutes');
const countdownSeconds = document.getElementById('countdownSeconds');

// Fecha de desbloqueo:
// 27 de septiembre de 2026 a las 00:00
const septemberUnlockDate = new Date(2026, 8, 27, 19, 6, 0);

function updateSeptemberCountdown() {

  const now = new Date();
  const difference = septemberUnlockDate - now;

  // Si ya llegó la fecha de desbloqueo
  if (difference <= 0) {

    unlockSeptember();

    return;
  }

  // Calculamos el tiempo restante
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  // Mostramos siempre dos dígitos
  countdownDays.textContent = String(days).padStart(2, '0');
  countdownHours.textContent = String(hours).padStart(2, '0');
  countdownMinutes.textContent = String(minutes).padStart(2, '0');
  countdownSeconds.textContent = String(seconds).padStart(2, '0');
}


// =========================================================
// 🔓 DESBLOQUEAR SEPTIEMBRE
// =========================================================

function unlockSeptember() {

  // Evitamos ejecutarlo varias veces
  if (septemberCard.classList.contains('unlocked')) {
    return;
  }

  // Creamos nuevamente el sobre con el diseño ORIGINAL
  const unlockedCard = document.createElement('a');

  unlockedCard.href = 'septiembre/index.html';
  unlockedCard.className = 'envelope-card active unlocked';

  unlockedCard.innerHTML = `
    <div class="bat-wing wing-left"></div>

    <div class="envelope-body">

      <div class="envelope-paper">
        <span class="month-text">SEPTIEMBRE</span>
        <span class="status-text">DECRYPTED</span>
      </div>

      <div class="envelope-flap"></div>

      <div class="envelope-heart-blood"></div>

    </div>

    <div class="bat-wing wing-right"></div>
  `;

  // Reemplazamos el sobre bloqueado por el nuevo
  septemberCard.replaceWith(unlockedCard);

  // Animación de desbloqueo
  unlockedCard.style.animation = 'septemberUnlock 0.8s ease';
}


// =========================================================
// ⏱️ ACTUALIZAR CONTADOR
// =========================================================

// Actualización inmediata
updateSeptemberCountdown();

// Actualizar cada segundo
const septemberTimer = setInterval(() => {

  updateSeptemberCountdown();

  // Cuando llegue la fecha, dejamos de ejecutar el contador
  if (new Date() >= septemberUnlockDate) {
    clearInterval(septemberTimer);
  }

}, 1000);
