import * as express from 'express';
import * as bcrypt from 'bcrypt';
const cookieParser = require('cookie-parser');
const IncomingForm = require('formidable').IncomingForm;

const userRouter = express.Router();
userRouter.use(cookieParser());

import { UserController } from '../controllers/user';
import { TripController } from '../controllers/trip';
import { user } from './login';
import { auth } from '../middleware/auth';
import * as jwt from 'jsonwebtoken';

//let user: UserController;
const userTrips: TripController = new TripController();
const _secret = 'secret';

userRouter.get('/', (request: express.Request, response: express.Response) => {
    // const cookie = request.signedCookies;
    // console.log(cookie);

    // const token = request.headers['access-token'] as string;
    // jwt.verify(token, _secret, (err: Error, decoded: any) => {       
    //     if (err) {
    //       //response.clearCookie('accessToken');
    //       return response.status(401).send({ success: false, message: 'Вашата сесия е изтекла.' });       
    //     } else {
    //         user = new UserController(decoded.userName, decoded.password);
    //         userTrips.loadUserTrips(user.getUserName()); 

    //         response.status(200).send({
    //             success: true
    //         });
    //     }
    //   });

    if (user) {
        userTrips.loadUserTrips(user.getUserName()); 

        response.status(200).send({
            success: true
        });
    }
});

userRouter.get('/info', auth, (request: express.Request, response: express.Response) => {
    response.send({ success: true, data: user.viewProfileInfo() });
});

userRouter.post('/edit', auth, (request: express.Request, response: express.Response) => {
    const { userName, email, password, newPassword } = request.body;

    bcrypt.compare(password, user.getPassword()).then(function(res) {
        if(res) {
            bcrypt.hash(newPassword, 10).then(hash => {
                user.updateInfo(userName, email, hash);
                response.status(200).send({ success: true });
            });
        } else {
            response.send({
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
        user.uploadImage(image);
    });
    form.on('end', () => {
        response.send({ success: true, data: user.getImage() });
    });
    form.parse(request);
});

userRouter.get('/:listType', auth, (request: express.Request, response: express.Response) => {
    const listType = request.params.listType;

    if(listType === 'favorite') {
        response.send({ success: true, data: user.getFavoriteList() });
    } else if(listType === 'visited'){
        response.send({ success: true, data: user.getVisitedList() });
    } else if(listType === 'wantToVisit'){
        response.send({ success: true, data: user.getWantToVisitList() });
    } else if(listType === 'tripplans'){
        response.send({ success: true, data: userTrips.listUserTrips() });
    } else {
        response.status(404).send({ success: false, message: '404 Page not found' });
    }
});

userRouter.put('/addLandscape', auth, (request: express.Request, response: express.Response) => {
    const { listType, landscape } = request.body;

    if(listType === 'favorite') {
        user.addFavorite(landscape);
        response.send({ success: true });
    } else if(listType === 'visited'){
        user.addVisited(landscape);
        response.send({ success: true });
    } else if(listType === 'wantToVisit'){
        user.addWantToVisit(landscape);
        response.send({ success: true });
    } else {
        response.status(404).send({ success: false, message: '404 Page not found' });
    }
});

userRouter.put('/removeLandscape', auth, (request: express.Request, response: express.Response) => {
    const { listType, landscape } = request.body;

    if(listType === 'favorite') {
        user.removeFavorite(landscape);
        response.send({ success: true, data: user.getFavoriteList() });
    } else if(listType === 'visited'){
        user.removeVisited(landscape);
        response.send({ success: true, data: user.getVisitedList() });
    } else if(listType === 'wantToVisit'){
        user.removeWantToVisit(landscape);
        response.send({ success: true, data: user.getWantToVisitList() });
    } else {
        response.status(404).send({ success: false, message: '404 Page not found' });
    }
});

export { userRouter };