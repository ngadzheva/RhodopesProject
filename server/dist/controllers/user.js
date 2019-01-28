"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var UserController = /** @class */ (function () {
    function UserController(userName, password) {
        this._user = new user_1.User(userName, password);
    }
    UserController.prototype.getUserName = function () {
        return this._user.getUserName;
    };
    UserController.prototype.getPassword = function () {
        return this._user.getPassword;
    };
    UserController.prototype.viewProfileInfo = function () {
        var info = {};
        info.userName = this._user.getUserName;
        info.email = this._user.getEmail;
        info.image = this._user.getImage;
        info.password = this._user.getPassword;
        return info;
    };
    UserController.prototype.updateInfo = function (userName, email, password) {
        if (this._user.getUserName !== userName) {
            this._user.updateCommentsUser(userName);
            this._user.updateTripsUser(userName);
        }
        this._user.updateInfo(userName, email, password);
    };
    UserController.prototype.uploadImage = function (path) {
        this._user.setImage(path);
    };
    UserController.prototype.getImage = function () {
        return this._user.getImage;
    };
    UserController.prototype.addFavorite = function (landscape) {
        if (this._user.getFavorite.indexOf(landscape) === -1) {
            this._user.getFavorite.push(landscape);
            this._user.setFavorite = this._user.getFavorite;
        }
    };
    UserController.prototype.addVisited = function (landscape) {
        if (this._user.getVisited.indexOf(landscape) === -1) {
            this._user.getVisited.push(landscape);
            this._user.setVisited = this._user.getVisited;
        }
    };
    UserController.prototype.addWantToVisit = function (landscape) {
        if (this._user.getWantToVisit.indexOf(landscape) === -1) {
            this._user.getWantToVisit.push(landscape);
            this._user.setWantToVisit = this._user.getWantToVisit;
        }
    };
    UserController.prototype.removeFavorite = function (landscape) {
        var indexToRemove = this._user.getFavorite.indexOf(landscape);
        this._user.getFavorite.splice(indexToRemove, 1);
        this._user.setFavorite = this._user.getFavorite;
    };
    UserController.prototype.removeVisited = function (landscape) {
        var indexToRemove = this._user.getVisited.indexOf(landscape);
        this._user.getVisited.splice(indexToRemove, 1);
        this._user.setVisited = this._user.getVisited;
    };
    UserController.prototype.removeWantToVisit = function (landscape) {
        var indexToRemove = this._user.getWantToVisit.indexOf(landscape);
        this._user.getWantToVisit.splice(indexToRemove, 1);
        this._user.setWantToVisit = this._user.getWantToVisit;
    };
    UserController.prototype.getFavoriteList = function () {
        var favoriteList = this._user.getFavorite;
        favoriteList.sort();
        return favoriteList;
    };
    UserController.prototype.getVisitedList = function () {
        var visitedList = this._user.getVisited;
        visitedList.sort();
        return visitedList;
    };
    UserController.prototype.getWantToVisitList = function () {
        var wantToVisitList = this._user.getWantToVisit;
        wantToVisitList.sort();
        return wantToVisitList;
    };
    UserController.prototype.listUserTrips = function () {
        var trips = this._user.getUserTrips;
        trips.sort(function (trip1, trip2) {
            var date1 = new Date(trip1.plan[0].date);
            var date2 = new Date(trip2.plan[0].date);
            if (date1 > date2) {
                return 1;
            }
            else if (date1 < date2) {
                return -1;
            }
            else {
                if (trip1.name < trip2.name) {
                    return -1;
                }
                else if (trip1.name > trip2.name) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });
        return trips;
    };
    UserController.prototype.addUserTrip = function (trip) {
        if (!trip.name) {
            trip.name = 'Неозаглавено пътуване';
        }
        this._user.setUserTrip(trip);
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.js.map