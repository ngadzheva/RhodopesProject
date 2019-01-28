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
        var comment = {
            content: content,
            datePublished: datePublished,
            landscapeName: this._landscape.getName,
            user: user
        };
        this._landscape.setComment(comment);
    };
    LandmarkController.prototype.getComments = function (landscape) {
        var comments = this._landscape.getComments;
        comments.sort(function (comment1, comments2) {
            var date1 = new Date(comment1.datePublished);
            var date2 = new Date(comments2.datePublished);
            if (date1 > date2) {
                return 1;
            }
            else if (date1 < date2) {
                return -1;
            }
            else {
                if (comment1.user < comments2.user) {
                    return -1;
                }
                else if (comment1.user > comments2.user) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });
        return comments;
    };
    LandmarkController.prototype.getRating = function () {
        return this._landscape.getRating;
    };
    return LandmarkController;
}());
exports.LandmarkController = LandmarkController;
//# sourceMappingURL=landmark.js.map