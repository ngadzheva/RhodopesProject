import * as express from 'express';

const galleryRouter = express.Router();

import { GalleryController } from '../controllers/gallery';

const west = new GalleryController('west');
const east = new GalleryController('east');

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

export { galleryRouter };