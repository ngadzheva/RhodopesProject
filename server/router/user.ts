import * as express from 'express';

const userRouter = express.Router();

import { UserController } from '../controllers/user';
import { auth } from '../middleware/auth';

const user = new UserController('heartbeat', 'jjj');

userRouter.get('/', (request: express.Request, response: express.Response) => {
    response.send('done');
});

userRouter.get('/info', auth, (request: express.Request, response: express.Response) => {
    if(!user.getUserName()){
        response.status(400).send('400 User not found');
        return;
    } 

    response.send(user.viewProfileInfo());
});

userRouter.post('/info/edit', auth, (request: express.Request, response: express.Response) => {
    const { userName, email, password } = request.body;

    user.updateInfo(userName, email, password);

    response.redirect('/user/info');
});

userRouter.get('/:listType', (request: express.Request, response: express.Response) => {
    const listType = request.params.listType;

    if(listType === 'favorite') {
        response.send(user.getFavoriteList());
    } else if(listType === 'visited'){
        response.send(user.getVisitedList());
    } else if(listType === 'wantToVisit'){
        response.send(user.getWantToVisitList());
    } else {
        response.status(404).send('404 Page not found')
    }
});

userRouter.put('/addLandscape', auth, (request: express.Request, response: express.Response) => {
    const { listType, landscape, rhodopesPart } = request.body;

    if(listType === 'favorite') {
        user.addFavorite(landscape);
    } else if(listType === 'visited'){
        user.addVisited(landscape);
    } else if(listType === 'wantToVisit'){
        user.addWantToVisit(landscape);
    } else {
        response.status(404).send('404 Page not found')
    }

    response.redirect(`/landscapes/${rhodopesPart}`);
});

userRouter.put('/:listType/removeLandscape', auth, (request: express.Request, response: express.Response) => {
    const listType = request.params.listType;
    const { landscape } = request.body;

    if(listType === 'favorite') {
        user.removeFavorite(landscape);
    } else if(listType === 'visited'){
        user.removeVisited(landscape);
    } else if(listType === 'wantToVisit'){
        user.removeWantToVisit(landscape);
    } else {
        response.status(404).send('404 Page not found')
    }

    response.redirect(`user/${listType}`);
});

export { userRouter };