import * as bodyParser from 'body-parser';
import { Socket } from 'net';

import { connectRouter } from './router';
import { user } from './router/login';
import { landscape } from './router/landscape';
import { config } from './config/config';

const cors = require('cors');
const express = require('express');

const app = express();
const socket = require('http').createServer(app);  
const io = require('socket.io')(socket);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: config.client,
  credentials: true
}));

connectRouter(app); 

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

socket.listen(config.socket, () => {
  console.log(`Server is listening on ${config.socket}`);
});

app.listen(config.server, () => {
  console.log(`Server is listening on ${config.server}`);
});