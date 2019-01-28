"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var database_1 = require("../db/database");
var trip_1 = require("./trip");
var User = /** @class */ (function () {
    function User(userName, password) {
        this._password = password;
        this._userName = userName;
        this._email = '';
        this._favorite = [];
        this._image = undefined;
        this._visited = [];
        this._wantToVisit = [];
        this._userTrips = new trip_1.Trip(userName);
        this.load();
        //this._userTrips.loadTrip(userName);
    }
    User.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', this._userName)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
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
    // public insert(userName: string, password: string, email: string): void {
    //     let newUser: object = {
    //         email,
    //         favorite: [],
    //         password,
    //         userName,
    //         visited: [],
    //         wantToVisit: []
    //     }
    //     database.insertData(Collections[Collections.users], newUser);
    // }
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
    Object.defineProperty(User.prototype, "getUserTrips", {
        get: function () {
            return this._userTrips.getTrips;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.setUserTrip = function (trip) {
        this._userTrips.addTrip(trip);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map