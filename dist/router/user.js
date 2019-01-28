"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var bcrypt = __importStar(require("bcrypt"));
var cookieParser = require('cookie-parser');
var IncomingForm = require('formidable').IncomingForm;
var userRouter = express.Router();
exports.userRouter = userRouter;
userRouter.use(cookieParser());
var login_1 = require("./login");
var auth_1 = require("../middleware/auth");
userRouter.get('/', function (request, response) {
    if (login_1.user) {
        login_1.userTrips.loadUserTrips(login_1.user.getUserName());
        response.status(200).send({
            success: true
        });
    }
});
userRouter.get('/info', auth_1.auth, function (request, response) {
    response.send({ success: true, data: login_1.user.viewProfileInfo() });
});
userRouter.post('/edit', auth_1.auth, function (request, response) {
    var _a = request.body, userName = _a.userName, email = _a.email, password = _a.password, newPassword = _a.newPassword;
    bcrypt.compare(password, login_1.user.getPassword()).then(function (res) {
        if (res) {
            bcrypt.hash(newPassword, 10).then(function (hash) {
                login_1.user.updateInfo(userName, email, hash);
                response.status(200).send({ success: true });
            });
        }
        else {
            response.send({
                success: false,
                message: 'Грешна парола'
            });
        }
    });
});
userRouter.post('/uploadImage', auth_1.auth, function (request, response) {
    var form = new IncomingForm();
    var image;
    form.on('file', function (field, file) {
        image = file.path;
        login_1.user.uploadImage(image);
    });
    form.on('end', function () {
        response.send({ success: true, data: login_1.user.getImage() });
    });
    form.parse(request);
});
userRouter.get('/:listType', auth_1.auth, function (request, response) {
    var listType = request.params.listType;
    if (listType === 'favorite') {
        response.send({ success: true, data: login_1.user.getFavoriteList() });
    }
    else if (listType === 'visited') {
        response.send({ success: true, data: login_1.user.getVisitedList() });
    }
    else if (listType === 'wantToVisit') {
        response.send({ success: true, data: login_1.user.getWantToVisitList() });
    }
    else if (listType === 'tripplans') {
        response.send({ success: true, data: login_1.userTrips.listUserTrips() });
    }
    else {
        response.status(404).send({ success: false, message: '404 Page not found' });
    }
});
userRouter.put('/addLandscape', auth_1.auth, function (request, response) {
    var _a = request.body, listType = _a.listType, landscape = _a.landscape;
    if (listType === 'favorite') {
        login_1.user.addFavorite(landscape);
        response.send({ success: true });
    }
    else if (listType === 'visited') {
        login_1.user.addVisited(landscape);
        response.send({ success: true });
    }
    else if (listType === 'wantToVisit') {
        login_1.user.addWantToVisit(landscape);
        response.send({ success: true });
    }
    else {
        response.status(404).send({ success: false, message: '404 Page not found' });
    }
});
userRouter.put('/removeLandscape', auth_1.auth, function (request, response) {
    var _a = request.body, listType = _a.listType, landscape = _a.landscape;
    if (listType === 'favorite') {
        login_1.user.removeFavorite(landscape);
        response.send({ success: true, data: login_1.user.getFavoriteList() });
    }
    else if (listType === 'visited') {
        login_1.user.removeVisited(landscape);
        response.send({ success: true, data: login_1.user.getVisitedList() });
    }
    else if (listType === 'wantToVisit') {
        login_1.user.removeWantToVisit(landscape);
        response.send({ success: true, data: login_1.user.getWantToVisitList() });
    }
    else {
        response.status(404).send({ success: false, message: '404 Page not found' });
    }
});
//# sourceMappingURL=user.js.map