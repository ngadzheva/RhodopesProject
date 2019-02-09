import * as express from 'express';
import { user } from '../router/login';
import { UserRoles } from '../enums/userRoles';

function auth(request: any, response: express.Response, next: express.NextFunction) {
  if(user) {
    next();
  } else {
    return response.status(401).send({ 
            success: false, 
            message: 'Вашата сесия е изтекла.' 
        });
  }
}

function admin(request: any, response: express.Response, next: express.NextFunction) {
  if(user.getUserRole() === UserRoles[UserRoles.admin]) {
    next();
  } else {
    return response.status(401).send({ 
            success: false, 
            message: 'Неоторизиран достъп.' 
        });
  }
} 

export { auth, admin };