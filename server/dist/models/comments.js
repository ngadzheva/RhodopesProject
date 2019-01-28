"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var database_1 = require("../db/database");
var Comments = /** @class */ (function () {
    function Comments(landscape) {
        this._landscapeName = landscape;
        this._comments = new Array();
        this.load();
    }
    Object.defineProperty(Comments.prototype, "getComments", {
        get: function () {
            return this._comments;
        },
        enumerable: true,
        configurable: true
    });
    Comments.prototype.postComment = function (comment) {
        this._comments.push(comment);
        database_1.database.insertData(collections_1.Collections[collections_1.Collections.comments], comment);
    };
    Comments.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.comments], fields_1.Fields[fields_1.Fields.landscapeName], '==', this._landscapeName)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this._comments.push(doc.data());
            });
        });
    };
    return Comments;
}());
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map