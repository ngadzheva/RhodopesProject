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
var trip_1 = require("../controllers/trip");
var auth_1 = require("../middleware/auth");
var user;
exports.user = user;
var userTrips;
exports.userTrips = userTrips;
loginRouter.post('/', function (request, response) {
    var _a = request.body, userName = _a.userName, password = _a.password;
    database_1.database.queryData(collections_1.Collections[collections_1.Collections.users], fields_1.Fields[fields_1.Fields.userName], '==', userName)
        .get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            if (doc.data()) {
                bcrypt.compare(password, doc.data().password).then(function (res) {
                    if (res) {
                        var token = jwt.sign({ userName: userName, password: password }, _secret, { expiresIn: '1h' });
                        var cookieOptions = {
                            httpOnly: true,
                            path: '/',
                            secure: true
                        };
                        response.cookie('accessToken', token, cookieOptions);
                        exports.user = user = new user_1.UserController(userName, password);
                        exports.userTrips = userTrips = new trip_1.TripController();
                        response.redirect('/user');
                    }
                    else {
                        response.send({
                            success: false,
                            message: 'Грешна парола'
                        });
                    }
                });
            }
            else {
                response.send({
                    success: false,
                    message: 'Грешно потребителско име'
                });
            }
        });
    });
});
logoutRouter.post("/", auth_1.auth, function (request, response) {
    exports.user = user = null;
    exports.userTrips = userTrips = null;
    response.send({ success: true });
});
//# sourceMappingURL=login.js.map