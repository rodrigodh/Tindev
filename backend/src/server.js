const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {

};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;
});

//Conecta mongodb
mongoose.connect('mongodb+srv://omnistack:omistack2@cluster0-bs31k.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers

    return next();
});

app.use(cors());
//Avisa pro express que usaremos json.
app.use(express.json());
app.use(routes);

server.listen(3333);
