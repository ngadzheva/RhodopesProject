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
var landscapeRouter = express.Router();
exports.landscapeRouter = landscapeRouter;
var rhodopes_1 = require("../controllers/rhodopes");
var landmark_1 = require("../controllers/landmark");
var login_1 = require("./login");
var west = new rhodopes_1.RhodopesController('west');
var east = new rhodopes_1.RhodopesController('east');
var landscape;
exports.landscape = landscape;
landscapeRouter.get('/:rhodopesPart', function (request, response) {
    var rhodopesPart = request.params.rhodopesPart;
    var landscapes = rhodopesPart === 'west' ? west.viewLandscapes() : east.viewLandscapes();
    var landmarks = new Array();
    landscapes.forEach(function (value) {
        landmarks.push(value);
    });
    response.send(landmarks);
});
landscapeRouter.get('/:rhodopesPart/:landscapeName', function (request, response) {
    var rhodopesPart = request.params.rhodopesPart;
    var landscapeName = request.params.landscapeName;
    exports.landscape = landscape = rhodopesPart === 'west' ?
        new landmark_1.LandmarkController(west.getLandscape(landscapeName)) :
        new landmark_1.LandmarkController(east.getLandscape(landscapeName));
    response.send(landscape.viewLandscapeInfo());
});
landscapeRouter.post('/vote', function (request, response) {
    var vote = request.body.vote;
    landscape.vote(vote);
    response.send(JSON.stringify(landscape.getRating()));
});
landscapeRouter.post('/:rhodopesPart/:landscapeName/comment', function (request, response) {
    var _a = request.body, content = _a.content, datePublished = _a.datePublished;
    var userName = login_1.user ? login_1.user.getUserName() : 'Гост';
    landscape.postComment(content, datePublished, userName);
    response.send(JSON.stringify({ user: userName, datePublished: datePublished, content: content }));
});
landscapeRouter.get('/:rhodopesPart/:landscapeName/comments', function (request, response) {
    var landscapeName = request.params.landscapeName;
    var comments = landscape.getComments(landscapeName);
    var commentsToShow = new Array();
    comments.forEach(function (value) {
        commentsToShow.push(value);
    });
    response.send(commentsToShow);
});
//# sourceMappingURL=landscape.js.map