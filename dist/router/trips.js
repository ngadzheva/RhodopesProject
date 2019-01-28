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
var auth_1 = require("../middleware/auth");
var login_1 = require("./login");
var tripsRouter = express.Router();
exports.tripsRouter = tripsRouter;
var trip_1 = require("../controllers/trip");
var trips = new trip_1.TripController();
tripsRouter.post('/', auth_1.auth, function (request, response) {
    var _a = request.body, startPoint = _a.startPoint, name = _a.name, plan = _a.plan;
    var tripToAdd = {
        done: false,
        name: name,
        plan: plan,
        user: login_1.user.getUserName(),
        startPoint: startPoint
    };
    trips.addNewTrip(tripToAdd);
    response.status(200).send({ success: true });
});
//# sourceMappingURL=trips.js.map