"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function accessControl(request, response, next) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Credentials: true');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
exports.accessControl = accessControl;
;
//# sourceMappingURL=accessControl.js.map