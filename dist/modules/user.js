"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var collections_1 = require("../enums/collections");
var conditions_1 = require("../enums/conditions");
var fields_1 = require("../enums/fields");
var database_1 = require("../db/database");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(password, userName) {
        var _this = _super.call(this, '') || this;
        _this._password = password;
        _this._userName = userName;
        _this._email = '';
        _this._favorite = [];
        _this._visited = [];
        _this._wantToVisit = [];
        return _this;
    }
    User.prototype.load = function () {
        var _this = this;
        var user = {};
        database_1.database.queryData(collections_1.Collections.Users, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this.setID(doc.id);
                _this._email = doc.data().email;
                _this._favorite = doc.data().favorite;
                _this._visited = doc.data().visited;
                _this._wantToVisit = doc.data().wantToVisit;
                user.uid = doc.id;
                user.email = _this._email;
                user.favorite = _this._favorite;
                user.password = _this._password;
                user.userName = _this._userName;
                user.visited = _this._visited;
                user.wantToVisit = _this._wantToVisit;
            });
        });
        return user;
    };
    User.prototype.insert = function (userName, password, email) {
        var newUser = {
            email: email,
            favorite: [],
            password: password,
            userName: userName,
            visited: [],
            wantToVisit: []
        };
        database_1.database.insertData(collections_1.Collections.Lanscapes, newUser);
    };
    Object.defineProperty(User.prototype, "getEmail", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setEmail", {
        set: function (email) {
            this._email = email;
            database_1.database.updateData(collections_1.Collections.Lanscapes, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName, { email: this._email });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getFavorite", {
        get: function () {
            return this._favorite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setFavorite", {
        set: function (favorite) {
            this._favorite = favorite;
            database_1.database.updateData(collections_1.Collections.Lanscapes, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName, { favorite: this._favorite });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getPassword", {
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setPassword", {
        set: function (password) {
            this._password = password;
            database_1.database.updateData(collections_1.Collections.Lanscapes, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName, { password: this._password });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getUserName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setUserName", {
        set: function (userName) {
            this._userName = userName;
            database_1.database.updateData(collections_1.Collections.Lanscapes, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName, { useName: this._userName });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getVisited", {
        get: function () {
            return this._visited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setVisited", {
        set: function (visited) {
            this._visited = visited;
            database_1.database.updateData(collections_1.Collections.Lanscapes, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName, { visited: this._visited });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getWantToVisit", {
        get: function () {
            return this._wantToVisit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "setWantToVisit", {
        set: function (wantToVisit) {
            this._wantToVisit = wantToVisit;
            database_1.database.updateData(collections_1.Collections.Lanscapes, fields_1.Fields.UserName, conditions_1.Conditions.EqualTo, this._userName, { wantToVisit: this._wantToVisit });
        },
        enumerable: true,
        configurable: true
    });
    return User;
}(base_1.Base));
exports.User = User;
//# sourceMappingURL=user.js.map