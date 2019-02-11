import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { UserRoles } from '../enums/userRoles';

function auth(request: any, response: express.Response, next: express.NextFunction) {
  const token = request.headers['access-token'];

  if(token) {
    jwt.verify(token, config.jwtKey, function(err: Error, decoded: any) {       
      if (err) {
          return response.status(401).send({ 
                      success: false, 
                      message: 'Вашата сесия е изтекла.' 
                  });      
      } else {       
        next();
      }
    });

  } else {
    return response.status(403).send({ 
        success: false, 
        message: 'Неоторизиран достъп.' 
    });
  }
}

function admin(request: any, response: express.Response, next: express.NextFunction) {
  const token = request.headers['access-token'];

  if(token) {
    jwt.verify(token, config.jwtKey, function(err: Error, decoded: any) {       
      if (err) {
          return response.status(401).send({ 
                      success: false, 
                      message: 'Вашата сесия е изтекла.' 
                  });      
      } else {  
        if(decoded.role === UserRoles[UserRoles.admin]) {
          next();
        } else {
          return response.status(403).send({ 
            success: false, 
            message: 'Неоторизиран достъп.' 
          });
        }
      }
    });

  } else {
    return response.status(403).send({ 
        success: false, 
        message: 'Неоторизиран достъп.' 
    });
  }
} 

export { auth, admin };