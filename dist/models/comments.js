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
var Comments = /** @class */ (function (_super) {
    __extends(Comments, _super);
    function Comments(landscape) {
        var _this = _super.call(this, '') || this;
        _this._landscapeName = landscape;
        _this._comments = new Array();
        _this.load();
        return _this;
    }
    Object.defineProperty(Comments.prototype, "getComments", {
        get: function () {
            return this._comments;
        },
        enumerable: true,
        configurable: true
    });
    Comments.prototype.postComment = function (content, datePublished, userName) {
        var comment = {
            content: content,
            datePublished: datePublished,
            landscapeName: this._landscapeName,
            user: userName
        };
        this._comments.push(comment);
        database_1.database.insertData(collections_1.Collections[collections_1.Collections.comments], comment);
    };
    Comments.prototype.load = function () {
        var _this = this;
        database_1.database.queryData(collections_1.Collections[collections_1.Collections.comments], fields_1.Fields[fields_1.Fields.landscapeName], '==', this._landscapeName)
            .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _this.setID = doc.id;
                _this._comments.push(doc.data());
            });
        });
    };
    return Comments;
}(base_1.Base));
exports.Comments = Comments;
//# sourceMappingURL=comments.js.map