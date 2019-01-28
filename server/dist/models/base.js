"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base(id) {
        this._id = id;
    }
    Base.prototype.getID = function () {
        return this._id;
    };
    Base.prototype.setID = function (id) {
        this._id = id;
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=base.js.map