const socket = io()

socket.emit('message', ' Hola soy nuevo')


//Carga de productos
socket.on('loadProducts',data=>
    {
        console.log(data)
        loadProducts(data)
    })


socket.on('server:liveProduct',data=>{
  console.log(data)
  socket.emit('cliente:liveProduct', 'que es lo que queres')
})
socket.emit('cliente:liveProduct', 'que es lo que queres')
//PRUEBA NOTIFICACION TOAST
socket.on('connectUser', data =>{
    console.log(data)
    const popupHTML = document.getElementById('popup')
    console.log(popupHTML)
    const toastHTML = document.getElementById('toastConecction')
    
    toastHTML.innerHTML += `
    <div id="newToast" class="toast align-items-center text-bg-primary border-0" role="status" aria-live="assertive" aria-atomic="true" " display: table-footer-group m-2>
        <div class="d-flex">
        <div class="toast-body data-bs-delay="10000">
        ${data}
      </div>
      <button id = "btnToast" type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>`
  document.getElementById('newToast').setAttribute('style',"display : table-footer-group;")
  popupHTML.appendChild(toastHTML)
    document.getElementById('btnToast').onclick = ()=>{
      console.log('no cierra')
      document.getElementById('newToast').setAttribute('style',"display : none;")
    }


})
