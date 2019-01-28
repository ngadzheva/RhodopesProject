"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trip_1 = require("../models/trip");
var TripController = /** @class */ (function () {
    function TripController(user) {
        this._trips = new trip_1.Trip(user);
    }
    TripController.prototype.loadUserTrips = function (user) {
        this._trips.loadTrip(user);
    };
    TripController.prototype.addNewTrip = function (trip) {
        this._trips.addTrip(trip);
    };
    TripController.prototype.listUserTrips = function () {
        return this._trips.getTrips;
    };
    return TripController;
}());
exports.TripController = TripController;
//# sourceMappingURL=trip.js.map