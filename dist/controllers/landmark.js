"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var landmark_1 = require("../models/landmark");
var rhodopes_1 = require("../models/rhodopes");
var comments_1 = require("../models/comments");
var LandmarkController = /** @class */ (function () {
    function LandmarkController(rhodopesPart) {
        this._landscape = new rhodopes_1.Rhodopes(rhodopesPart);
    }
    LandmarkController.prototype.viewLandscapeInfo = function (landscapeName, rhodopesPart) {
        var info = {};
        var landscape = new landmark_1.Landmark(landscapeName, rhodopesPart);
        return info;
    };
    LandmarkController.prototype.vote = function (landscapeName, rhodopesPart, voteType) {
        var landscape = new landmark_1.Landmark(landscapeName, rhodopesPart);
        landscape.load();
        landscape.setRating = voteType === 'like' ? landscape.getRating + 1 : landscape.getRating - 1;
    };
    LandmarkController.prototype.postComment = function (content, datePublished, landscape, user) {
        var comment = new comments_1.Comments(content, datePublished, landscape, user);
        comment.postComment();
    };
    LandmarkController.prototype.getComments = function (landscape) {
        return new comments_1.Comments('', new Date(), '', '').getComments(landscape);
    };
    return LandmarkController;
}());
exports.LandmarkController = LandmarkController;
//# sourceMappingURL=landmark.js.map