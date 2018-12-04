"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../db/database");
var landmark_1 = require("./landmark");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var Rhodopes = /** @class */ (function () {
    function Rhodopes(rhodopesPart) {
        this._rhodopesPart = rhodopesPart;
        this._landscapes = new Array();
    }
    Rhodopes.prototype.getRhodopesPartLandscapes = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.landscapes], fields_1.Fields[fields_1.Fields.rhodopesPart], '==', this._rhodopesPart)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var landscapeName = doc.data().name;
                var landscapeToLoad = new landmark_1.Landmark(landscapeName, _this._rhodopesPart);
                _this._landscapes.push(landscapeToLoad);
            });
        });
    };
    Object.defineProperty(Rhodopes.prototype, "getLandscapes", {
        get: function () {
            return this._landscapes;
        },
        enumerable: true,
        configurable: true
    });
    return Rhodopes;
}());
exports.Rhodopes = Rhodopes;
//# sourceMappingURL=rhodopes.js.map