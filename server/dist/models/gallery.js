"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../db/database");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var Gallery = /** @class */ (function () {
    function Gallery(rhodopesPart) {
        this._folders = new Map();
        this._parentFolder = rhodopesPart;
        this.load();
    }
    Gallery.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.gallery], fields_1.Fields[fields_1.Fields.parentFolder], '==', this._parentFolder)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var folder = doc.data().folder;
                _this._folders.set(folder, doc.data().images);
            });
        });
    };
    Object.defineProperty(Gallery.prototype, "getFolders", {
        get: function () {
            return this._folders;
        },
        enumerable: true,
        configurable: true
    });
    Gallery.prototype.getFolderImages = function (folder) {
        return this._folders.get(folder);
    };
    return Gallery;
}());
exports.Gallery = Gallery;
//# sourceMappingURL=gallery.js.map