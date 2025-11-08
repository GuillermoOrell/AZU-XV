(function(){
  // Configuración de EmailJS (Necesario para enviar el formulario RSVP)
  emailjs.init({
    publicKey: 'r_JJsCKDCee_TzEu9', // Tu clave pública
  });

// --- MODAL DE RESULTADO (Función Central para mensajes de éxito/error) ---
// Esta función reemplaza a 'alert()'
const resModal=document.getElementById('resultModal');
function showResult(title,text){
  document.getElementById('resultTitle').textContent=title;
  document.getElementById('resultText').textContent=text;
  resModal.classList.add('show');
}
// Cierra el modal de resultado
document.getElementById('closeResult').onclick=()=>resModal.classList.remove('show');
resModal.querySelector('.modal-overlay').onclick=()=>resModal.classList.remove('show');


// --- COUNTDOWN (CONTADOR REGRESIVO) ---
const countdown=document.getElementById('countdown');
// Fecha y hora del evento: 7 de diciembre de 2025, 21:00 hs (GMT-3 Argentina)
const target=new Date('2025-12-07T21:00:00-03:00').getTime();

const updateCountdown = () => {
  const diff=target-Date.now();
  if(diff<=0){
    countdown.textContent='¡LLEGÓ EL GRAN DÍA!'; // Mensaje final
    clearInterval(timerInterval);
    return;
  }
  // Cálculo de días, horas, minutos y segundos restantes
  const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
  // Formato de visualización
  countdown.textContent=`${d} DÍAS ${h} HORAS ${m} MINUTOS ${s} SEGUNDOS`;
};

// Se ejecuta la actualización inicial y se establece el intervalo de 1 segundo
updateCountdown(); 
const timerInterval = setInterval(updateCountdown, 1000); 


// --- CARRUSEL INFINITO DE FOTOS ---
const carouselTrack = document.getElementById('carouselTrack');
const images = [];

// Generar las rutas de las 8 imágenes que debes subir
for (let i = 1; i <= 8; i++) {
    images.push(`azu0${i}.jpg`);
}

function setupCarousel() {
    if (!carouselTrack) return;
    
    let htmlContent = '';
    // Duplicamos la lista para crear el efecto de scroll continuo
    const allImages = [...images, ...images]; 

    allImages.forEach(src => {
        // Se inyecta el HTML para cada imagen en el carrusel
        htmlContent += `<img src="${src}" alt="Foto de Azu XV">`;
    });

    carouselTrack.innerHTML = htmlContent;
    
    // Ajustar el ancho del contenedor para permitir el scroll infinito
    carouselTrack.style.width = `${allImages.length * 310}px`; 
}

setupCarousel();

// --- MODAL DE TRANSFERENCIA ---
const modal=document.getElementById('transferModal'),overlay=modal.querySelector('.modal-overlay');

// Control de apertura y cierre del modal
document.getElementById('openTransfer').onclick=()=>modal.classList.add('show');
document.getElementById('closeModal').onclick=()=>modal.classList.remove('show');
overlay.onclick=()=>modal.classList.remove('show');

// Copiar datos de transferencia (usa showResult en lugar de alert)
document.getElementById('copyTransfer').onclick=()=>{
  navigator.clipboard.writeText('Alias: miel.nada.cuna.mp\nCBU: 00000031000346943265\nTitular: Guillermo Orellana\nDNI: 27028023')
    .then(() => showResult('✅ Copiado', 'Datos de transferencia copiados al portapapeles.'))
    .catch(err => console.error('Error al copiar:', err));
};

// --- FORMULARIO EMAILJS (Confirmación de Asistencia) ---
const form=document.getElementById('rsvpForm');
form.onsubmit=e=>{
  e.preventDefault();
  const name=form.name.value.trim(),msg=form.message.value.trim();
  
  // Validación de nombre (usa showResult)
  if(!name){showResult('⚠ Atención', 'Ingresá tu nombre para confirmar.');return;} 
  
  // Envío del correo electrónico
  emailjs.send('service_9twukxl','template_rmg8f37',{from_name:name,message:msg,to_email:'guillermoorellana@gmail.com'})
  .then(
    // Éxito
    ()=>showResult('🎉 ¡Tu confirmación fue enviada con éxito!','Gracias por confirmar tu asistencia 💕 ¡Nos vemos en la fiesta!')
  )
  .catch(
    // Error
    ()=>showResult('❌ Error','No se pudo enviar, intentá nuevamente.')
  );
  
  form.reset();
};
})();
