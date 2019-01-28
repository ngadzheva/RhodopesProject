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
var galleryRouter = express.Router();
exports.galleryRouter = galleryRouter;
var gallery_1 = require("../controllers/gallery");
var west = new gallery_1.GalleryController('west');
var east = new gallery_1.GalleryController('east');
galleryRouter.get('/:rhodopesPart', function (request, response) {
    var rhodopesPart = request.params.rhodopesPart;
    var rhodopesPartGallery = rhodopesPart === 'west' ? west.getImageAlbums() : east.getImageAlbums();
    response.status(200).send(rhodopesPartGallery);
});
galleryRouter.get('/:rhodopesPart/:landscape', function (request, response) {
    var rhodopesPart = request.params.rhodopesPart;
    var landscape = request.params.landscape;
    var landscapeGallery = rhodopesPart === 'west' ? west.getLandscapeGallery(landscape) : east.getLandscapeGallery(landscape);
    var galleryToReturn = {
        landscape: landscape,
        'images': landscapeGallery
    };
    response.status(200).send(galleryToReturn);
});
//# sourceMappingURL=gallery.js.map