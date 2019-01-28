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

export { landscapeRouter, landscape };