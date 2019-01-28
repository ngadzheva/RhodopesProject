import * as bodyParser from 'body-parser';
import { connectRouter } from './router';
import { Socket } from 'net';
import { user } from './router/login';
import { landscape } from './router/landscape';
const cors = require('cors');
const cookieParser = require('cookie-parser');

const express = require('express');

const serverPort = 3001;
const socketPort = 3000;

const app = express();
var server = require('http').createServer(app);  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(cookieParser());

connectRouter(app); 

const io = require('socket.io')(server);

io.on('connection', (socket: Socket) => {
  socket.on('vote', (vote => {
    landscape.vote(vote.data);

    io.sockets.emit('landscape vote', { success: true, data: landscape.getRating() });
  }));

  socket.on('comment', (comment => {
    const { content, datePublished } = comment;
    const userName = user ? user.getUserName() : 'Гост';

    landscape.postComment(content, datePublished, userName);

    io.sockets.emit('landscape comment', { success: true, data: { content, datePublished, user: userName } });
  }));
});

server.listen(socketPort, () => {
  console.log(`Server is listening on ${socketPort}`);
});

app.listen(serverPort, () => {
  console.log(`Server is listening on ${serverPort}`);
});