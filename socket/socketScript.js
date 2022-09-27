const {Server} = require('socket.io')

let io;
const message =[{
    socketID: '#12345',
    mssg: 'Mensaje de Prueba'
}]

class Socket{
    static init(httpServer){
        console.log('Configuracion del Socket')
        io= new Server (httpServer)
        io.on('connection', (clientSocket)=>{
            console.log('Nuevo Usuario Online', clientSocket.id)
        
        clientSocket.emit('Inicio', message)
        
        clientSocket.on('new-message', (data)=>{
            message.push({socketID: clientSocket.id, mssg: data})
            io.emit('notification', {socketID: clientSocket.id, mssg: data})
        })
        
        clientSocket.on('disconnect', ()=>{
            console.log('Usuario Desconectado :(')
        })
    })
    }

 }

 module.exports = Socket