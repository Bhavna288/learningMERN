var socket = io()

$(() => {
    $('#sendBtn').click(() => {
        var message = { name: $('#name').val(), message: $('#msg').val()}
        postMessage(message)
    })
    getMessages();
})

addMessage = (message) => {
    $('#messages').append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`)
}

socket.on('message', addMessage)

getMessages = () => {
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(addMessage);
    })
}

postMessage = (message) => {
    $.post('http://localhost:3000/messages', message)
}