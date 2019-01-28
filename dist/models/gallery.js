"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../db/database");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var base_1 = require("./base");
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery(rhodopesPart) {
        var _this = _super.call(this, '') || this;
        _this._folders = new Map();
        _this._parentFolder = rhodopesPart;
        _this.load();
        return _this;
    }
    Gallery.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.gallery], fields_1.Fields[fields_1.Fields.parentFolder], '==', this._parentFolder)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this.setID = doc.id;
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
}(base_1.Base));
exports.Gallery = Gallery;
//# sourceMappingURL=gallery.js.map