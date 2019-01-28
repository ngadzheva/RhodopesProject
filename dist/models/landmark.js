"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var database_1 = require("../db/database");
var comments_1 = require("./comments");
var Landmark = /** @class */ (function () {
    function Landmark(landscape) {
        var description = landscape.description, entranceFee = landscape.entranceFee, image = landscape.image, latitude = landscape.latitude, longitude = landscape.longitude, location = landscape.location, name = landscape.name, hotels = landscape.hotels, rating = landscape.rating, rhodopesPart = landscape.rhodopesPart, shortInfo = landscape.shortInfo, transitionTime = landscape.transitionTime, workTime = landscape.workTime;
        this._description = description;
        this._entranceFee = entranceFee;
        this._image = image;
        this._latitude = latitude;
        this._longitutde = longitude;
        this._location = location;
        this._name = name;
        this._hotels = hotels;
        this._rating = rating;
        this._rhodopesPart = rhodopesPart;
        this._shortInfo = shortInfo;
        this._transitionTime = transitionTime;
        this._workTime = workTime;
        this._comments = new comments_1.Comments(this._name);
    }
    Object.defineProperty(Landmark.prototype, "getDescription", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setDescription", {
        set: function (description) {
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getEntranceFee", {
        get: function () {
            return this._entranceFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setEntranceFee", {
        set: function (entranceFee) {
            this._entranceFee = entranceFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getImage", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setImage", {
        set: function (url) {
            this._image = url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getLatitude", {
        get: function () {
            return this._latitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getLongitude", {
        get: function () {
            return this._longitutde;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getLocation", {
        get: function () {
            return this._location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setLocation", {
        set: function (location) {
            this._location = location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getName", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setName", {
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getHotels", {
        get: function () {
            return this._hotels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setHotels", {
        set: function (hotels) {
            this._hotels = hotels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getRating", {
        get: function () {
            return this._rating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setRating", {
        set: function (rating) {
            this._rating = rating;
            database_1.database.updateData(collections_1.Collections[collections_1.Collections.landscapes], fields_1.Fields[fields_1.Fields.name], '==', this._name, { rating: this._rating });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getRhodopesPart", {
        get: function () {
            return this._rhodopesPart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setRhodopesPart", {
        set: function (rhodopesPart) {
            this._rhodopesPart = rhodopesPart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getShortInfo", {
        get: function () {
            return this._shortInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setShortInfo", {
        set: function (shortInfo) {
            this._shortInfo = shortInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getTransitionTime", {
        get: function () {
            return this._transitionTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setTransitionTime", {
        set: function (transitionTime) {
            this._transitionTime = transitionTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getWorkTime", {
        get: function () {
            return this._workTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setWorkTime", {
        set: function (workTime) {
            this._workTime = workTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getComments", {
        get: function () {
            return this._comments.getComments;
        },
        enumerable: true,
        configurable: true
    });
    Landmark.prototype.setComment = function (content, datePublished, user) {
        this._comments.postComment(content, datePublished, user);
    };
    return Landmark;
}());
exports.Landmark = Landmark;
//# sourceMappingURL=landmark.js.map