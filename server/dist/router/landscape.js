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
    response.status(200).send(landmarks);
});
landscapeRouter.get('/:rhodopesPart/:landscapeName', function (request, response) {
    var rhodopesPart = request.params.rhodopesPart;
    var landscapeName = request.params.landscapeName;
    exports.landscape = landscape = rhodopesPart === 'west' ?
        new landmark_1.LandmarkController(west.getLandscape(landscapeName)) :
        new landmark_1.LandmarkController(east.getLandscape(landscapeName));
    response.status(200).send(landscape.viewLandscapeInfo());
});
//# sourceMappingURL=landscape.js.map