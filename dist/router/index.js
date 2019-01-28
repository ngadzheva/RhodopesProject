"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var landscape_1 = require("./landscape");
var trips_1 = require("./trips");
var gallery_1 = require("./gallery");
var login_1 = require("./login");
var register_1 = require("./register");
function connectRouter(app) {
    app.use('/login', login_1.loginRouter);
    app.use('/logout', login_1.logoutRouter);
    app.use('/register', register_1.registerRouter);
    app.use('/user', user_1.userRouter);
    app.use('/landscapes', landscape_1.landscapeRouter);
    app.use('/tripplan', trips_1.tripsRouter);
    app.use('/gallery', gallery_1.galleryRouter);
}
exports.connectRouter = connectRouter;
//# sourceMappingURL=index.js.map