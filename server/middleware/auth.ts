import * as express from 'express';
import { user } from '../router/login';

export function auth(request: any, response: express.Response, next: express.NextFunction) {
  if(user) {
    next();
  } else {
    return response.status(401).send({ 
            success: false, 
            message: 'Вашата сесия е изтекла.' 
        });
  }
}
  