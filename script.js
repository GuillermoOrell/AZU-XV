(function(){
  // Esperar a que el DOM esté listo (evita problemas si el script se ejecuta antes)
  document.addEventListener('DOMContentLoaded', function(){

    // Inicializar EmailJS (clave pública)
    try {
      emailjs.init('r_JJsCKDCee_TzEu9'); // asegúrate que esta es tu publicKey correcta
      console.log('EmailJS inicializado');
    } catch (err) {
      console.warn('No se pudo inicializar EmailJS:', err);
    }

    /* ---------- Cuenta regresiva ---------- */
    const countdown = document.getElementById('countdown');
    if (!countdown) {
      console.error('Elemento #countdown no encontrado en el DOM.');
      return; // salimos; el resto del script depende del DOM existente
    }

    // Fecha del evento en formato ISO con offset de Argentina (-03:00)
    // Esto evita inconsistencias entre navegadores al parsear la fecha.
    const eventDate = new Date('2025-12-07T21:00:00-03:00').getTime();

    function updateCountdown(){
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0){
        countdown.innerText = '¡LLEGÓ EL GRAN DÍA!';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Ejecutar inmediatamente y cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ---------- Modal de transferencia ---------- */
    const modal = document.getElementById('transferModal');
    if (modal) {
      const overlay = modal.querySelector('.modal-overlay');
      const openBtn = document.getElementById('openTransfer');
      const closeBtn = document.getElementById('closeModal');
      const copyBtn = document.getElementById('copyTransfer');

      if (openBtn) openBtn.onclick = () => modal.classList.add('show');
      if (closeBtn) closeBtn.onclick = () => modal.classList.remove('show');
      if (overlay) overlay.onclick = () => modal.classList.remove('show');

      if (copyBtn) {
        copyBtn.onclick = () => {
          const text = 'Alias: miel.nada.cuna.mp\nCBU: 00000031000346943265\nTitular: Guillermo Orellana\nDNI: 27028023';
          navigator.clipboard.writeText(text)
            .then(() => alert('Datos de transferencia copiados al portapapeles.'))
            .catch(() => alert('No se pudo copiar al portapapeles.'));
        };
      }
    } else {
      console.warn('Modal de transferencia no encontrado (transferModal).');
    }

    /* ---------- Envío del formulario (EmailJS) ---------- */
    const form = document.getElementById('rsvpForm');
    if (form) {
      form.onsubmit = function(e){
        e.preventDefault();
        const name = (form.name && form.name.value) ? form.name.value.trim() : '';
        const msg = (form.message && form.message.value) ? form.message.value.trim() : '';

        if (!name) {
          alert('Ingresá tu nombre');
          return;
        }

        // Reemplazá service_id/template_id por los tuyos si son distintos
        emailjs.send('service_9twukxl', 'template_rmg8f37', {
          from_name: name,
          message: msg,
          to_email: 'guillermoorellana@gmail.com'
        }).then(() => {
          showResult('🎉 ¡Tu confirmación fue enviada con éxito!', 'Gracias por confirmar tu asistencia 💕 ¡Nos vemos en la fiesta!');
        }).catch((err) => {
          console.error('Error EmailJS:', err);
          showResult('❌ Error', 'No se pudo enviar, intentá nuevamente.');
        });

        form.reset();
      };
    } else {
      console.warn('Formulario #rsvpForm no encontrado.');
    }

    /* ---------- Modal de resultado ---------- */
    const resModal = document.getElementById('resultModal');
    function showResult(title, text){
      const t = document.getElementById('resultTitle');
      const tx = document.getElementById('resultText');
      if (t) t.textContent = title;
      if (tx) tx.textContent = text;
      if (resModal) resModal.classList.add('show');
    }

    if (resModal) {
      const closeR = document.getElementById('closeResult');
      const closeR2 = document.getElementById('closeResult2');
      const overlayR = resModal.querySelector('.modal-overlay');
      if (closeR) closeR.onclick = () => resModal.classList.remove('show');
      if (closeR2) closeR2.onclick = () => resModal.classList.remove('show');
      if (overlayR) overlayR.onclick = () => resModal.classList.remove('show');
    }

  }); // DOMContentLoaded end
})(); // IIFE end
