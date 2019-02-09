import * as express from 'express';
import * as bcrypt from 'bcrypt';
const cookieParser = require('cookie-parser');
const IncomingForm = require('formidable').IncomingForm;

const userRouter = express.Router();
userRouter.use(cookieParser());

import { user, userTrips } from './login';
import { auth } from '../middleware/auth';
import * as jwt from 'jsonwebtoken';

userRouter.get('/', (request: any, response: express.Response) => {
    if (user) {
        //userTrips.loadUserTrips(user.getUserName());

        //response.append('Access-Token', request.cookies['accessToken']);
        //let token = request.session.user;
        response.status(200).send({
            success: true
        });
    }
});

userRouter.get('/info', auth, (request: express.Request, response: express.Response) => {
    response.status(200).send({ success: true, data: user.viewProfileInfo() });
});

userRouter.put('/edit', auth, (request: express.Request, response: express.Response) => {
    const { userName, email, password, newPassword } = request.body;

    bcrypt.compare(password, user.getPassword()).then(function(res) {
        if(res) {
            bcrypt.hash(newPassword, 10).then(hash => {
                user.updateInfo(userName, email, hash);
                response.status(200).send({ success: true });
            });
        } else {
            response.status(404).send({
                success: false,
                message:'Грешна парола'
            });
        }
    });
});

userRouter.post('/uploadImage', auth, (request: express.Request, response: express.Response) => {
    const form = new IncomingForm();
    let image: string;

    form.on('file', (field: any, file: any) => {
        image = file.path;
        user.uploadImage('users/' + user.getUserName() + '/', image);
    });
    form.on('end', () => {
        setTimeout(() => {
            response.status(200).send({ success: true, data: user.getImage() });
        }, 1000);
    });
    form.parse(request);
});

userRouter.get('/:listType', auth, (request: express.Request, response: express.Response) => {
    const listType = request.params.listType;

    if(listType === 'favorite') {
        response.status(200).send({ success: true, data: user.getFavoriteList() });
    } else if(listType === 'visited'){
        response.status(200).send({ success: true, data: user.getVisitedList() });
    } else if(listType === 'wantToVisit'){
        response.status(200).send({ success: true, data: user.getWantToVisitList() });
    } else if(listType === 'tripplans'){
        response.status(200).send({ success: true, data: user.listUserTrips() });
    } else {
        response.status(404).send({ success: false, message: '404 Страницата не е открита.' });
    }
});

userRouter.post('/addLandscape', auth, (request: express.Request, response: express.Response) => {
    const { listType, landscape } = request.body;

    if(listType === 'favorite') {
        user.addFavorite(landscape);
        response.status(200).send({ success: true });
    } else if(listType === 'visited'){
        user.addVisited(landscape);
        response.status(200).send({ success: true });
    } else if(listType === 'wantToVisit'){
        user.addWantToVisit(landscape);
        response.status(200).send({ success: true });
    } else {
        response.status(404).send({ success: false, message: '404 Страницата не е открита.' });
    }
});

userRouter.delete('/removeLandscape/:listType/:landscape', auth, (request: express.Request, response: express.Response) => {
    const listType = request.params.listType;
    const landscape = request.params.landscape;

    if(listType === 'favorite') {
        user.removeFavorite(landscape);
        response.status(200).send({ success: true, data: user.getFavoriteList() });
    } else if(listType === 'visited'){
        user.removeVisited(landscape);
        response.status(200).send({ success: true, data: user.getVisitedList() });
    } else if(listType === 'wantToVisit'){
        user.removeWantToVisit(landscape);
        response.status(200).send({ success: true, data: user.getWantToVisitList() });
    } else {
        response.status(404).send({ success: false, message: '404 Страницата не е открита.' });
    }
});

export { userRouter };