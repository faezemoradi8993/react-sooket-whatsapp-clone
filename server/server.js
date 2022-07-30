const io = require('socket.io')(5000,{
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders:["secretHeader"],
      credentials: true
    }}
    );
io.on('connection', socket => {
    const id = socket.handshake.query.id
    console.log(id)
    socket.join(id)
    // socket.emit('request', /* … */); // emit an event to the socket
    // io.emit('broadcast', /* … */); // emit an event to all connected sockets
    // socket.on('reply', () => { /* … */ }); // listen to the event
    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit("receive-message", {
                recipients: newRecipients, sender: id, text
            })
        });


    }); // listen to the event

});
