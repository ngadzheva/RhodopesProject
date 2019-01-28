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
var jwt = __importStar(require("jsonwebtoken"));
var loginRouter = express.Router();
exports.loginRouter = loginRouter;
var logoutRouter = express.Router();
exports.logoutRouter = logoutRouter;
var _secret = 'secret';
var database_1 = require("../db/database");
var collections_1 = require("../enums/collections");
var fields_1 = require("../enums/fields");
var user_1 = require("../controllers/user");
var auth_1 = require("../middleware/auth");
var user;
exports.user = user;
var userTrips;
exports.userTrips = userTrips;
loginRouter.post('/', function (request, response) {
    var _a = request.body, userName = _a.userName, password = _a.password;
    database_1.database.queryData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', userName)
        .get().then(function (snapshot) {
        if (snapshot.docs.length > 0) {
            snapshot.forEach(function (doc) {
                bcrypt.compare(password, doc.data().password).then(function (res) {
                    if (res) {
                        var token = jwt.sign({ userName: userName, password: password }, _secret, { expiresIn: '1h' });
                        var cookieOptions = {
                            httpOnly: true,
                            path: '/',
                            domain: 'localhost'
                        };
                        response.cookie('accessToken', token, cookieOptions);
                        exports.user = user = new user_1.UserController(userName, password);
                        //userTrips = new TripController(userName);
                        response.append('Access-Token', token);
                        response.redirect('/user');
                    }
                    else {
                        response.status(400).send({
                            success: false,
                            message: 'Грешна парола'
                        });
                    }
                });
            });
        }
        else {
            response.status(404).send({
                success: false,
                message: 'Грешно потребителско име'
            });
        }
    });
});
logoutRouter.post("/", auth_1.auth, function (request, response) {
    exports.user = user = null;
    //userTrips = null;
    response.status(200).send({ success: true });
});
//# sourceMappingURL=login.js.map