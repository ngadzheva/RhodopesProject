"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var UserController = /** @class */ (function () {
    function UserController(userName, password) {
        this._user = new user_1.User(userName, password);
    }
    UserController.prototype.viewProfileInfo = function () {
        var info = {};
        info.userName = this._user.getUserName;
        info.email = this._user.getEmail;
        info.password = this._user.getPassword;
        return info;
    };
    UserController.prototype.updateInfo = function (userName, email, password) {
        this._user.setUserName = userName;
        this._user.setEmail = email;
        this._user.setPassword = password;
    };
    UserController.prototype.addFavorite = function (landscape) {
        this._user.getFavorite.push(landscape);
        this._user.setFavorite = this._user.getFavorite;
    };
    UserController.prototype.addVisited = function (landscape) {
        this._user.getVisited.push(landscape);
        this._user.setVisited = this._user.getVisited;
    };
    UserController.prototype.addWantToVisit = function (landscape) {
        this._user.getWantToVisit.push(landscape);
        this._user.setWantToVisit = this._user.getWantToVisit;
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
    UserController.prototype.getFavoriteList = function (landscape) {
        return this._user.getFavorite;
    };
    UserController.prototype.getVisitedList = function (landscape) {
        return this._user.getVisited;
    };
    UserController.prototype.getWantToVisitList = function (landscape) {
        return this._user.getWantToVisit;
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.js.map