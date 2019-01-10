import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { user } from '../router/login';

const _secret = 'secret';

export function auth(request: any, response: express.Response, next: express.NextFunction) {
  // var token = request.headers['authorization']; //request.cookies.accessToken;

  // if (token) {
  //   jwt.verify(token, _secret, (err: Error, decoded: any) => {       
  //     if (err) {
  //       response.clearCookie('accessToken');
  //       return response.status(401).send({ success: false, message: 'Вашата сесия е изтекла.' });       
  //     } else {
  //       request.decoded = decoded;         
  //       next();
  //     }
  //   });
  // } else {
  //   return response.status(401).send({ 
  //       success: false, 
  //       message: 'Вашата сесия е изтекла.' 
  //   });
  // }

  if(user) {
    next();
  } else {
    return response.send({ 
            success: false, 
            message: 'Вашата сесия е изтекла.' 
        });
  }
}
  