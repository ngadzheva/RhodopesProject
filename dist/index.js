"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = __importStar(require("body-parser"));
var router_1 = require("./router");
var login_1 = require("./router/login");
var landscape_1 = require("./router/landscape");
var cors = require('cors');
var cookieParser = require('cookie-parser');
var express = require('express');
var port = 3001;
var app = express();
var server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(cookieParser());
router_1.connectRouter(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.on('vote', (function (vote) {
        landscape_1.landscape.vote(vote.data);
        io.sockets.emit('landscape vote', { success: true, data: landscape_1.landscape.getRating() });
    }));
    socket.on('comment', (function (comment) {
        var content = comment.content, datePublished = comment.datePublished;
        var userName = login_1.user ? login_1.user.getUserName() : 'Гост';
        landscape_1.landscape.postComment(content, datePublished, userName);
        io.sockets.emit('landscape comment', { success: true, data: { content: content, datePublished: datePublished, user: userName } });
    }));
});
server.listen(3000, function () {
    console.log("Server is listening on " + port);
});
app.listen(port, function () {
    console.log("Server is listening on " + port);
});
//# sourceMappingURL=index.js.map