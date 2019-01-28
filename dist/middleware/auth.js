"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("../router/login");
function auth(request, response, next) {
    if (login_1.user) {
        next();
    }
    else {
        return response.send({
            success: false,
            message: 'Вашата сесия е изтекла.'
        });
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map