"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rhodopes_1 = require("../models/rhodopes");
var RhodopesController = /** @class */ (function () {
    function RhodopesController(rhodopesPart) {
        this._landscape = new rhodopes_1.Rhodopes(rhodopesPart);
    }
    RhodopesController.prototype.viewLandscapes = function () {
        return this._landscape.getLandscapes;
    };
    RhodopesController.prototype.getLandscape = function (landscapeName) {
        return this._landscape.getLandscapeInfo(landscapeName);
    };
    return RhodopesController;
}());
exports.RhodopesController = RhodopesController;
//# sourceMappingURL=rhodopes.js.map