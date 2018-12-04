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
var Landmark = /** @class */ (function (_super) {
    __extends(Landmark, _super);
    function Landmark(name, rhodopesPart) {
        var _this = _super.call(this, '') || this;
        _this._description = '';
        _this._entranceFee = 0;
        _this._location = '';
        _this._name = name;
        _this._hotels = [];
        _this._rating = 0;
        _this._rhodopesPart = rhodopesPart;
        _this._shortInfo = '';
        _this._transitionTime = '';
        _this._workTime = '';
        _this.load();
        return _this;
    }
    Landmark.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.landscapes], fields_1.Fields[fields_1.Fields.name], '==', this._name)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this.setID(doc.id);
                _this._description = doc.data().description;
                _this._entranceFee = doc.data().entranceFee;
                _this._location = doc.data().location;
                _this._hotels = doc.data().hotels;
                _this._rating = doc.data().rating;
                _this._shortInfo = doc.data().shortInfo;
                _this._transitionTime = doc.data().transitionTime;
                _this._workTime = doc.data().workTime;
            });
        });
    };
    Object.defineProperty(Landmark.prototype, "getDescription", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setDescription", {
        set: function (description) {
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getEntranceFee", {
        get: function () {
            return this._entranceFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setEntranceFee", {
        set: function (entranceFee) {
            this._entranceFee = entranceFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getLocation", {
        get: function () {
            return this._location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setLocation", {
        set: function (location) {
            this._location = location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getName", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setName", {
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getHotels", {
        get: function () {
            return this._hotels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setHotels", {
        set: function (hotels) {
            this._hotels = hotels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getRating", {
        get: function () {
            return this._rating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setRating", {
        set: function (rating) {
            this._rating = rating;
            database_1.database.updateData(collections_1.Collections[collections_1.Collections.landscapes], fields_1.Fields[fields_1.Fields.name], '==', this._name, { rating: this._rating });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getRhodopesPart", {
        get: function () {
            return this._rhodopesPart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setRhodopesPart", {
        set: function (rhodopesPart) {
            this._rhodopesPart = rhodopesPart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getShortInfo", {
        get: function () {
            return this._shortInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setShortInfo", {
        set: function (shortInfo) {
            this._shortInfo = shortInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getTransitionTime", {
        get: function () {
            return this._transitionTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setTransitionTime", {
        set: function (transitionTime) {
            this._transitionTime = transitionTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "getWorkTime", {
        get: function () {
            return this._workTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Landmark.prototype, "setWorkTime", {
        set: function (workTime) {
            this._workTime = workTime;
        },
        enumerable: true,
        configurable: true
    });
    return Landmark;
}(base_1.Base));
exports.Landmark = Landmark;
//# sourceMappingURL=landmark.js.map