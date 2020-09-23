var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

mongoose.Promise = Promise

var dbUrl = 'mongodb+srv://bhavnatahelyani:bhavna288@learning-node.36qjc.azure.mongodb.net/learning-node?retryWrites=true&w=majority';

app.get('/messages', (req, resp) => {
    Message.find({}, (err, messages) => {
        resp.send(messages)
    })
})


app.get('/messages/:user', (req, resp) => {
    var user = req.params.user
    Message.find({name: user}, (err, messages) => {
        resp.send(messages)
    })
})

app.post('/messages', async (req, resp) => {

    try {
        var message = new Message(req.body)

        var savedMessage = await message.save()
    
        // console.log('saved')
        // search for badwords
    
        var censored =  await Message.findOne({message: { $regex: 'badword'}})
    
        if(censored) {
            // console.log('censored words found', censored)
            await Message.deleteOne({ _id: censored.id })
        } else
            io.emit('message', req.body)
    
        resp.sendStatus(200);   
    } catch (error) {
        resp.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('message post called')
    }
    
})

io.on('connection', (socket) => {
    console.log("a user connected")
})

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    console.log('MongoDB connection: ', err)
})

var server = http.listen(3000, () => {
    console.log("Server listening on port ", server.address().port);
})