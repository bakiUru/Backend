(function() {
    let message=[];
    const formMsg = document.getElementById('form-msg');
    const iMsg = document.getElementById('i-msg');
    const showMsg = document.getElementById('show-msg');

    const socket = io();

    const updateMsg = (message=[]) =>{
        showMsg.innerText = '';
        message.forEach(data=>{
            const item = document.createElement('li');
            item.innerText = `${data.socketID} --- ${data.mssg}`
            showMsg.appendChild(item);
        })
    }

    formMsg.addEventListener('submit', e=>{
        e.preventDefault();
        socket.emit('new-message', iMsg.value);
        iMsg.value='';
        iMsg.focus();
    })

    socket.on('Inicio', (data)=>{
        message = data;
        updateMsg(message);
    })

    socket.on('notification', (data)=>{
        message.push(data);
        updateMsg(message);
    })
})();