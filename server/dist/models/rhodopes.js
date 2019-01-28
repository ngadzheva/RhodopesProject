"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../db/database");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var Rhodopes = /** @class */ (function () {
    function Rhodopes(rhodopesPart) {
        this._rhodopesPart = rhodopesPart;
        this._landscapes = new Map();
        this.getRhodopesPartLandscapes();
    }
    Rhodopes.prototype.getRhodopesPartLandscapes = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.landscapes], fields_1.Fields[fields_1.Fields.rhodopesPart], '==', this._rhodopesPart)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var landscapeName = doc.data().name;
                _this._landscapes.set(landscapeName, doc.data());
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
    Rhodopes.prototype.getLandscapeInfo = function (landscape) {
        return this._landscapes.get(landscape);
    };
    return Rhodopes;
}());
exports.Rhodopes = Rhodopes;
//# sourceMappingURL=rhodopes.js.map