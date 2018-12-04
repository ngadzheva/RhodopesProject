"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var landscape_1 = require("./landscape");
function connectRouter(app) {
    app.use('/user', user_1.userRouter);
    app.use('/landscapes', landscape_1.landscapeRouter);
}
exports.connectRouter = connectRouter;
//# sourceMappingURL=index.js.map