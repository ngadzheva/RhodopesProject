import * as express from 'express';

const landscapeRouter = express.Router();

import { RhodopesController } from '../controllers/rhodopes';
import { LandmarkController } from '../controllers/landmark';

import { user } from './login';

const west = new RhodopesController('west');
const east = new RhodopesController('east');
let landscape: LandmarkController;

landscapeRouter.get('/:rhodopesPart', (request: express.Request, response: express.Response) => {
    const cookie = request.cookies;
    const rhodopesPart = request.params.rhodopesPart;
    const landscapes = rhodopesPart === 'west' ? west.viewLandscapes() : east.viewLandscapes();

    const landmarks: Array<Object> = new Array();

    landscapes.forEach((value: any) => {
        landmarks.push(value);
    });

    response.send(landmarks);
});

landscapeRouter.get('/:rhodopesPart/:landscapeName', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;
    landscape = rhodopesPart === 'west' ? 
                new LandmarkController(west.getLandscape(landscapeName)) : 
                new LandmarkController(east.getLandscape(landscapeName));

    response.send(landscape.viewLandscapeInfo());
});

landscapeRouter.post('/vote', (request: express.Request, response: express.Response) => {
    const { vote } = request.body;

    landscape.vote(vote);

    response.send(JSON.stringify(landscape.getRating()));
});

landscapeRouter.post('/:rhodopesPart/:landscapeName/comment', (request: express.Request, response: express.Response) => {
    const { content, datePublished } = request.body;
    const userName = user ? user.getUserName() : 'Гост';

    landscape.postComment(content, datePublished, userName);

    response.send(JSON.stringify({ user: userName, datePublished, content }));
});

landscapeRouter.get('/:rhodopesPart/:landscapeName/comments', (request: express.Request, response: express.Response) => {
    const landscapeName = request.params.landscapeName;

    const comments = landscape.getComments(landscapeName);
    let commentsToShow: Array<Object> = new Array();

    comments.forEach((value: object) => {
        commentsToShow.push(value);
    });

    response.send(commentsToShow);
});

export { landscapeRouter, landscape };