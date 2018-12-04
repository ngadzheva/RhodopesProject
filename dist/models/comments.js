"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var database_1 = require("../db/database");
var Comments = /** @class */ (function () {
    function Comments(content, datePublished, landscape, user) {
        this._content = content;
        this._datePublished = datePublished;
        this._landscapeName = landscape;
        this._userName = user;
    }
    Comments.prototype.postComment = function () {
        var comment = {
            content: this._content,
            datePublished: this._datePublished,
            landscapeName: this._landscapeName,
            useName: this._userName
        };
        database_1.database.insertData(collections_1.Collections[collections_1.Collections.comments], comment);
    };
    Comments.prototype.getComment = function () {
        return {
            content: this._content,
            datePublished: this._datePublished,
            landscapeName: this._landscapeName,
            useName: this._userName
        };
    };
    Comments.prototype.getComments = function (landscape) {
        var _this = this;
        var comments = new Array();
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.comments], fields_1.Fields[fields_1.Fields.landscapeName], '==', landscape)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this._content = doc.data().content;
                _this._datePublished = doc.data().datePublished;
                _this._landscapeName = landscape;
                _this._userName = doc.data().useName;
                var comment = {
                    content: _this._content,
                    datePublished: _this._datePublished,
                    landscapeName: _this._landscapeName,
                    useName: _this._userName
                };
                comments.push(comment);
            });
        });
        return comments;
    };
    return Comments;
}());
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map