import * as express from 'express';

export function accessControl(request: any, response: express.Response, next: express.NextFunction) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Credentials: true');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};