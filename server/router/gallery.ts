import * as express from 'express';

import { admin } from '../middleware/auth';
import { GalleryController } from '../controllers/gallery';

const IncomingForm = require('formidable').IncomingForm;
const galleryRouter = express.Router();

const west = new GalleryController('west');
const east = new GalleryController('east');

galleryRouter.get('/', admin, (request: express.Request, response: express.Response) => {
    const westGallery = west.getImageAlbums();
    const eastGallery = east.getImageAlbums();
    const gallery = [...westGallery, ...eastGallery];

    response.status(200).send(gallery);
});

galleryRouter.get('/:rhodopesPart', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const rhodopesPartGallery = rhodopesPart === 'west' ? west.getImageAlbums() : east.getImageAlbums();

    response.status(200).send(rhodopesPartGallery);
});

galleryRouter.get('/:rhodopesPart/:landscape', (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscape = request.params.landscape;
    const landscapeGallery = rhodopesPart === 'west' ? west.getLandscapeGallery(landscape) : east.getLandscapeGallery(landscape);

    const galleryToReturn = {
        landscape,
        'images': landscapeGallery
    }

    response.status(200).send(galleryToReturn);
});

galleryRouter.delete('/:rhodopesPart/:landscape/:image', admin, (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscape = request.params.landscape;
    const image: string = request.params.image;
    let landscapeGallery;

    if(rhodopesPart === 'west') {
        west.removeLandscapeImage(landscape, image);
        landscapeGallery = west.getLandscapeGallery(landscape);
    } else {
       east.removeLandscapeImage(landscape, image); 
       landscapeGallery = west.getLandscapeGallery(landscape);
    } 

    const galleryToReturn = {
        landscape,
        'images': landscapeGallery
    }

    response.status(200).send({ success: true, data: galleryToReturn });
});

galleryRouter.delete('/:rhodopesPart/:landscape', admin, (request: express.Request, response: express.Response) => {
    const rhodopesPart = request.params.rhodopesPart;
    const landscape = request.params.landscape;

    rhodopesPart === 'west' ? west.removeLandscapeAlbum(landscape) : east.removeLandscapeAlbum(landscape); 


    const westGallery = west.getImageAlbums();
    const eastGallery = east.getImageAlbums();
    const gallery = [...westGallery, ...eastGallery];

    response.status(200).send({ success: true, data: gallery });
});

galleryRouter.post('/uploadImage/:rhodopesPart/:landscape', admin, (request: express.Request, response: express.Response) => {
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
            const imagesToReturn = rhodopesPart === 'west' ? west.getLandscapeGallery(landscape) : east.getLandscapeGallery(landscape);
            response.status(200).send({ success: true, data: imagesToReturn });
        }, 2000);
    });
    form.parse(request);
});

export { galleryRouter, west, east };