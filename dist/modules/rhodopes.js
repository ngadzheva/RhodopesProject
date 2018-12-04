"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../db/database");
var landmark_1 = require("./landmark");
var Rhodopes = /** @class */ (function () {
    function Rhodopes(rhodopesPart) {
        this._rhodopesPart = rhodopesPart;
    }
    Rhodopes.prototype.getRhodopesPartLandscapes = function () {
        var _this = this;
        var landscapes = new Array();
        database_1.database.queryData('landscapes', 'rhodopesPart', '==', this._rhodopesPart)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var landscapeName = doc.data().name;
                var landscapeToLoad = new landmark_1.Landmark(landscapeName, _this._rhodopesPart);
                //landscapeToLoad.load();
                landscapes.push(landscapeToLoad.load());
            });
        });
        landscapes.forEach(function (value) {
            console.log(value);
        });
        return landscapes;
    };
    return Rhodopes;
}());
exports.Rhodopes = Rhodopes;
//# sourceMappingURL=rhodopes.js.map