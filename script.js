(function(){
  emailjs.init({
    publicKey: 'r_JJsCKDCee_TzEu9',
  });

// Cuenta regresiva
const countdown = document.getElementById('countdown');
const eventDate = new Date('December 7, 2025 21:00:00').getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = eventDate - now;
  if(distance <= 0){
    countdown.innerText = '¡LLEGÓ EL GRAN DÍA!';
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  countdown.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// transfer modal
const modal=document.getElementById('transferModal'),overlay=modal.querySelector('.modal-overlay');
document.getElementById('openTransfer').onclick=()=>modal.classList.add('show');
document.getElementById('closeModal').onclick=()=>modal.classList.remove('show');
overlay.onclick=()=>modal.classList.remove('show');
document.getElementById('copyTransfer').onclick=()=>{
 navigator.clipboard.writeText('Alias: miel.nada.cuna.mp\nCBU: 00000031000346943265\nTitular: Guillermo Orellana\nDNI: 27028023');
 alert('Datos de transferencia copiados al portapapeles.');
};

// email form

const form=document.getElementById('rsvpForm');

form.onsubmit=e=>{

 e.preventDefault();

 const name=form.name.value.trim(),msg=form.message.value.trim();

 if(!name){alert('Ingresá tu nombre');return;}

 emailjs.send('service_9twukxl','template_rmg8f37',{from_name:name,message:msg,to_email:'guillermoorellana@gmail.com'})

 .then(()=>showResult('🎉 ¡Tu confirmación fue enviada con éxito!','Gracias por confirmar tu asistencia 💕 ¡Nos vemos en la fiesta!'))

 .catch(()=>showResult('❌ Error','No se pudo enviar, intentá nuevamente.'));

 form.reset();

};

// result modal
const resModal=document.getElementById('resultModal');
function showResult(title,text){
 document.getElementById('resultTitle').textContent=title;
 document.getElementById('resultText').textContent=text;
 resModal.classList.add('show');
}
document.getElementById('closeResult').onclick=()=>resModal.classList.remove('show');
document.getElementById('closeResult2').onclick=()=>resModal.classList.remove('show');
resModal.querySelector('.modal-overlay').onclick=()=>resModal.classList.remove('show');

})();
