import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const _secret = 'secret';

export function auth(request: any, response: express.Response, next: express.NextFunction) {
    var token = request.body.token || request.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, _secret, function(err: Error, decoded: any) {       
        if (err) {
            return response.json({ success: false, message: 'Failed to authenticate token.' });       
        } else {
        // if everything is good, save to request for use in other routes
        request.decoded = decoded;         
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return response.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}
  