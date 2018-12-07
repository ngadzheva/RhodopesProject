import * as express from 'express';

const landscapeRouter = express.Router();

import { RhodopesController } from '../controllers/rhodopes';
import { LandmarkController } from '../controllers/landmark';

const west = new RhodopesController('west');
const east = new RhodopesController('east');
let landscape: LandmarkController;

landscapeRouter.get('/:rhodopesPart', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapes = rhodopesPart === 'west' ? west.viewLandscapes() : east.viewLandscapes();

    const landmarks: { [key: string]: any} = {};

    landscapes.forEach((value: any, key: any) => {
        landmarks[key] = value;
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

landscapeRouter.post('/:rhodopesPart/:landscapeName/vote', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;
    const { vote } = request.body;
    // const landscape = rhodopesPart === 'west' ? 
    //             new LandmarkController(west.getLandscape(landscapeName)) : 
    //             new LandmarkController(east.getLandscape(landscapeName));

    landscape.vote(vote);
});

landscapeRouter.post('/:rhodopesPart/:landscapeName/comment', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;
    const { content, date, user } = request.body;
    // const landscape = rhodopesPart === 'west' ? 
    //             new LandmarkController(west.getLandscape(landscapeName)) : 
    //             new LandmarkController(east.getLandscape(landscapeName));
    
    landscape.postComment(content, date, user);
    response.redirect('/:rhodopesPart/:landscapeName/comments');
});

landscapeRouter.get('/:rhodopesPart/:landscapeName/comments', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;
    // const landscape = rhodopesPart === 'west' ? 
    //             new LandmarkController(west.getLandscape(landscapeName)) : 
    //             new LandmarkController(east.getLandscape(landscapeName));

    const comments = landscape.getComments(landscapeName);
    let commentsToShow: { [key: number]: object} = {};

    comments.forEach((value: object, index: number) => {
        commentsToShow[index] = value;
    });

    response.send(landscape.getComments(landscapeName));
});

export { landscapeRouter };