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
var fields_1 = require("../enums/fields");
var database_1 = require("../db/database");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(userName, password) {
        var _this = _super.call(this, '') || this;
        _this._password = password;
        _this._userName = userName;
        _this._email = '';
        _this._favorite = [];
        _this._image = undefined;
        _this._visited = [];
        _this._wantToVisit = [];
        _this.load();
        return _this;
    }
    User.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', this._userName)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this.setID = doc.id;
                _this._userName = doc.data().userName;
                _this._password = doc.data().password;
                _this._email = doc.data().email;
                _this._favorite = doc.data().favorite;
                _this._image = doc.data().image;
                _this._visited = doc.data().visited;
                _this._wantToVisit = doc.data().wantToVisit;
            });
        });
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
        database_1.database.insertData(collections_1.Collections[collections_1.Collections.users], newUser);
    };
    User.prototype.updateInfo = function (userName, email, password) {
        database_1.database.updateData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', this._userName, { userName: userName, email: email, password: password });
        this._userName = userName;
        this._email = email;
        this._password = password;
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
            database_1.database.updateData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', this._userName, { email: this._email });
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
            this.updateLandscapesList(fields_1.Fields[fields_1.Fields.favorite], this._favorite);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "getImage", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.setImage = function (path) {
        var _this = this;
        database_1.database.uploadImage(path).then(function (data) {
            _this._image = data;
            database_1.database.updateData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', _this._userName, { image: _this._image });
        });
    };
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
            database_1.database.updateData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', this._userName, { password: this._password });
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
            var oldUserName = this._userName;
            this._userName = userName;
            database_1.database.updateData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', oldUserName, { userName: this._userName });
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
            this.updateLandscapesList(fields_1.Fields[fields_1.Fields.visited], this._visited);
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.updateLandscapesList = function (listType, landscapes) {
        var _a;
        database_1.database.updateData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', this._userName, (_a = {}, _a[listType] = landscapes, _a));
    };
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
            this.updateLandscapesList(fields_1.Fields[fields_1.Fields.wantToVisit], this._wantToVisit);
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.updateCommentsUser = function (userName) {
        database_1.database.updateData(collections_1.Collections[collections_1.Collections.comments], fields_1.Fields[fields_1.Fields.user], "==", this._userName, { user: userName });
    };
    User.prototype.updateTripsUser = function (userName) {
        database_1.database.updateData(collections_1.Collections[collections_1.Collections.trips], fields_1.Fields[fields_1.Fields.user], "==", this._userName, { user: userName });
    };
    return User;
}(base_1.Base));
exports.User = User;
//# sourceMappingURL=user.js.map