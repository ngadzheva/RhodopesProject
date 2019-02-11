import * as express from 'express';

import { RhodopesController } from '../controllers/rhodopes';
import { LandmarkController } from '../controllers/landmark';
import { west as westGallery, east as eastGallery } from './gallery';
import { admin } from '../middleware/auth';

const IncomingForm = require('formidable').IncomingForm;
const landscapeRouter = express.Router();

const west = new RhodopesController('west');
const east = new RhodopesController('east');
let landscape: LandmarkController;

landscapeRouter.get('/', admin, (request: express.Request, response: express.Response) => {
    const westLandscapes =  west.viewLandscapes();
    const eastLandscapes = east.viewLandscapes();

    const landmarks: Array<Object> = new Array();

    westLandscapes.forEach((value: any) => {
        landmarks.push(value);
    });

    eastLandscapes.forEach((value: any) => {
        landmarks.push(value);
    });

    response.status(200).send(landmarks);
});

landscapeRouter.get('/:rhodopesPart', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapes = rhodopesPart === 'west' ? west.viewLandscapes() : east.viewLandscapes();

    const landmarks: Array<Object> = new Array();

    landscapes.forEach((value: any) => {
        landmarks.push(value);
    });

    response.status(200).send(landmarks);
});

landscapeRouter.get('/:rhodopesPart/:landscapeName', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;
    landscape = rhodopesPart === 'west' ? 
                new LandmarkController(west.getLandscape(landscapeName) as { [key: string]: any }) : 
                new LandmarkController(east.getLandscape(landscapeName) as { [key: string]: any });

    response.status(200).send(landscape.viewLandscapeInfo());
});

landscapeRouter.put('/:rhodopesPart/:landscapeName', admin, (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;
    landscape = rhodopesPart === 'west' ? 
                new LandmarkController(west.getLandscape(landscapeName) as { [key: string]: any }) : 
                new LandmarkController(east.getLandscape(landscapeName) as { [key: string]: any });

    const newData = request.body;

    landscape.editLandscape(newData);

    response.status(200).send({ success: true });
});

landscapeRouter.post('/createLandscape', admin, (request: express.Request, response: express.Response) => {
    const landscape = request.body;

    landscape.rhodopesPart === 'west' ? west.addLandscape(landscape) : east.addLandscape(landscape);

    response.status(200).send({ success: true });
});

landscapeRouter.post('/uploadImage/:rhodopesPart/:landscape', admin, (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscape = request.params.landscape;

    const form = new IncomingForm();
    let image: string;

    form.on('file', (field: any, file: any) => {
        image = file.path;
        rhodopesPart === 'west' ? west.uploadImage(landscape, image) : east.uploadImage(landscape, image);
    });
    form.on('end', () => {
        setTimeout(() => {
            const data = rhodopesPart === 'west' ? west.viewLandscapes() : east.viewLandscapes();
            response.status(200).send({ success: true, data });
        }, 1000);
    });
    form.parse(request);
});

landscapeRouter.delete('/:rhodopesPart/:landscapeName', admin, (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscapeName = request.params.landscapeName;

    if(rhodopesPart === 'west') {
        west.removeLandscape(landscapeName);
        westGallery.removeLandscapeAlbum(landscapeName);
    } else {
        east.removeLandscape(landscapeName);
        eastGallery.removeLandscapeAlbum(landscapeName);
    }

    const data = rhodopesPart === 'west' ? west.viewLandscapes() : east.viewLandscapes();
    response.status(200).send({ success: true, data });
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