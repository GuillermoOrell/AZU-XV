(function(){
  // Configuración de EmailJS (Mantenido)
  emailjs.init({
    publicKey: 'r_JJsCKDCee_TzEu9',
  });

// --- COUNTDOWN (CONTADOR) ---
// La fecha se ajusta a '2025-12-07T21:00:00-03:00' (7 de Diciembre 21:00 hs, GMT-3 Argentina)
const countdown=document.getElementById('countdown');
const target=new Date('2025-12-07T21:00:00-03:00').getTime();
const timerInterval = setInterval(() => {
  const diff=target-Date.now();
  if(diff<=0){
    countdown.textContent='¡LLEGÓ EL GRAN DÍA!'; // Mensaje final
    clearInterval(timerInterval);
    return;
  }
  const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
  // Formato más limpio para la cuenta regresiva
  countdown.textContent=`${d} DÍAS ${h} HORAS ${m} MINUTOS ${s} SEGUNDOS`;
}, 1000);

// --- CARRUSEL INFINITO ---
const carouselTrack = document.getElementById('carouselTrack');
const images = [];

// Generar las 8 imágenes
for (let i = 1; i <= 8; i++) {
    images.push(`azu0${i}.jpg`);
}

// Función para inyectar imágenes en el carrusel y duplicarlas para el efecto infinito
function setupCarousel() {
    if (!carouselTrack) return;
    
    let htmlContent = '';
    // Duplicamos la lista de imágenes para que la animación se vea infinita
    const allImages = [...images, ...images]; 

    allImages.forEach(src => {
        // Se inyecta el HTML para cada imagen
        htmlContent += `<img src="${src}" alt="Foto de Azu XV">`;
    });

    carouselTrack.innerHTML = htmlContent;
    
    // Ajustar el ancho del track para que sepa cuándo detener la animación
    // 310px es el ancho de la imagen (300px) más el margen (10px)
    carouselTrack.style.width = `${allImages.length * 310}px`; 
}

setupCarousel();

// --- MODALES Y TRANSFERENCIA (Mantenido) ---
const modal=document.getElementById('transferModal'),overlay=modal.querySelector('.modal-overlay');
document.getElementById('openTransfer').onclick=()=>modal.classList.add('show');
document.getElementById('closeModal').onclick=()=>modal.classList.remove('show');
overlay.onclick=()=>modal.classList.remove('show');
document.getElementById('copyTransfer').onclick=()=>{
  // Nota: No usar alert(), usar el modal de resultado si es posible, pero para copiar es más directo
  navigator.clipboard.writeText('Alias: miel.nada.cuna.mp\nCBU: 00000031000346943265\nTitular: Guillermo Orellana\nDNI: 27028023')
    .then(() => showResult('✅ Copiado', 'Datos de transferencia copiados al portapapeles.'))
    .catch(err => console.error('Error al copiar:', err));
};

// --- FORMULARIO EMAILJS (Mantenido) ---
const form=document.getElementById('rsvpForm');
form.onsubmit=e=>{
  e.preventDefault();
  const name=form.name.value.trim(),msg=form.message.value.trim();
  if(!name){showResult('⚠ Atención', 'Ingresá tu nombre para confirmar.');return;}
  emailjs.send('service_9twukxl','template_rmg8f37',{from_name:name,message:msg,to_email:'guillermoorellana@gmail.com'})
  .then(()=>showResult('🎉 ¡Tu confirmación fue enviada con éxito!','Gracias por confirmar tu asistencia 💕 ¡Nos vemos en la fiesta!'))
  .catch(()=>showResult('❌ Error','No se pudo enviar, intentá nuevamente.'));
  form.reset();
};

// --- MODAL DE RESULTADO (Mantenido) ---
const resModal=document.getElementById('resultModal');
function showResult(title,text){
  document.getElementById('resultTitle').textContent=title;
  document.getElementById('resultText').textContent=text;
  resModal.classList.add('show');
}
document.getElementById('closeResult').onclick=()=>resModal.classList.remove('show');

})();
