"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var bcrypt = __importStar(require("bcrypt"));
var registerRouter = express.Router();
exports.registerRouter = registerRouter;
var database_1 = require("../db/database");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
registerRouter.put('/', function (request, response) {
    var _a = request.body, userName = _a.userName, password = _a.password, email = _a.email;
    database_1.database.queryData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', userName)
        .get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            if (doc.data()) {
                response.send({
                    success: false,
                    message: 'Съществува потребител с въведеното потребителско име.'
                });
                Promise.reject();
            }
        });
    }).then(function () {
        bcrypt.hash(password, 10).then(function (hash) {
            database_1.database.insertData(collections_1.Collections[collections_1.Collections.users], { userName: userName, password: hash, email: email, favorite: [], visited: [], wantToVisit: [] });
            response.status(200).send({
                success: true
            });
        });
    });
});
//# sourceMappingURL=register.js.map