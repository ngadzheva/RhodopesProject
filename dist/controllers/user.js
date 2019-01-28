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
        return this._user.getFavorite;
    };
    UserController.prototype.getVisitedList = function () {
        return this._user.getVisited;
    };
    UserController.prototype.getWantToVisitList = function () {
        return this._user.getWantToVisit;
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.js.map