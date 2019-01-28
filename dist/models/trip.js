"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../db/database");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var Trip = /** @class */ (function () {
    function Trip() {
        this._trips = new Array();
    }
    Trip.prototype.loadTrip = function (user) {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.trips], fields_1.Fields[fields_1.Fields.user], '==', user)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this._trips.push(doc.data());
            });
        });
    };
    Trip.prototype.addTrip = function (trip) {
        database_1.database.insertData(collections_1.Collections[collections_1.Collections.trips], trip);
    };
    Object.defineProperty(Trip.prototype, "getTrips", {
        get: function () {
            return this._trips;
        },
        enumerable: true,
        configurable: true
    });
    return Trip;
}());
exports.Trip = Trip;
//# sourceMappingURL=trip.js.map