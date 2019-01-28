"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var landmark_1 = require("../models/landmark");
var LandmarkController = /** @class */ (function () {
    function LandmarkController(landscape) {
        this._landscape = new landmark_1.Landmark(landscape);
    }
    LandmarkController.prototype.viewLandscapeInfo = function () {
        var info = {};
        info.description = this._landscape.getDescription;
        info.entranceFee = this._landscape.getEntranceFee;
        info.image = this._landscape.getImage;
        info.latitude = this._landscape.getLatitude;
        info.longitude = this._landscape.getLongitude;
        info.location = this._landscape.getLocation;
        info.name = this._landscape.getName;
        info.hotels = this._landscape.getHotels;
        info.rating = this._landscape.getRating;
        info.rhodopesPart = this._landscape.getRhodopesPart;
        info.shortInfo = this._landscape.getShortInfo;
        info.transitionTime = this._landscape.getTransitionTime;
        info.workTime = this._landscape.getWorkTime;
        return info;
    };
    LandmarkController.prototype.vote = function (voteType) {
        this._landscape.setRating = voteType === 'like' ? this._landscape.getRating + 1 : this._landscape.getRating - 1;
    };
    LandmarkController.prototype.postComment = function (content, datePublished, user) {
        this._landscape.setComment(content, datePublished, user);
    };
    LandmarkController.prototype.getComments = function (landscape) {
        return this._landscape.getComments;
    };
    LandmarkController.prototype.getRating = function () {
        return this._landscape.getRating;
    };
    return LandmarkController;
}());
exports.LandmarkController = LandmarkController;
//# sourceMappingURL=landmark.js.map