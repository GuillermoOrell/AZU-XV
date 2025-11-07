(function(){
  emailjs.init({
    publicKey: 'r_JJsCKDCee_TzEu9',
  });

// countdown
// La fecha se ajusta a '2025-12-07T21:00:00-03:00' (7 de Diciembre 21:00 hs, GMT-3 Argentina)
const countdown=document.getElementById('countdown');
const target=new Date('2025-12-07T21:00:00-03:00').getTime();
setInterval(()=>{
 const diff=target-Date.now();
 if(diff<=0){countdown.textContent='¡Llegó el gran día!';return;}
 const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
 // Se añade un formato más limpio para la cuenta regresiva
 countdown.textContent=`${d} DÍAS ${h} HORAS ${m} MINUTOS ${s} SEGUNDOS`;
},1000);

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

// emailjs.init('r_JJsCKDCee_TzEu9');

})();