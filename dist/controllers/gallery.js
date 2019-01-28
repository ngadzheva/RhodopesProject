"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gallery_1 = require("../models/gallery");
var GalleryController = /** @class */ (function () {
    function GalleryController(rhodopesPart) {
        this._gallery = new gallery_1.Gallery(rhodopesPart);
    }
    GalleryController.prototype.getImageAlbums = function () {
        var albums = new Array();
        var folders = this._gallery.getFolders;
        folders.forEach(function (value, key, folders) {
            var landscapeGallery = {
                landscape: key,
                images: value[0]
            };
            albums.push(landscapeGallery);
        });
        return albums;
    };
    GalleryController.prototype.getLandscapeGallery = function (landscape) {
        return this._gallery.getFolderImages(landscape);
    };
    return GalleryController;
}());
exports.GalleryController = GalleryController;
//# sourceMappingURL=gallery.js.map