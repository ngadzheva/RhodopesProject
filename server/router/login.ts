import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const loginRouter = express.Router();
const logoutRouter = express.Router();
const _secret = 'secret';

import { database } from '../db/database';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { UserController } from '../controllers/user';
import { TripController } from '../controllers/trip';
import { auth } from '../middleware/auth';

let user: any;
let userTrips: any;

loginRouter.post('/', (request: express.Request, response: express.Response) => {
    const { userName, password } = request.body;
    
    database.queryData(Collections[Collections.users], Fields[Fields.userName], '==', userName)
            .get().then((snapshot: any) => {
                if(snapshot.docs.length > 0) {
                    snapshot.forEach((doc: any) => {
                        bcrypt.compare(password, doc.data().password).then(function(res) {
                            if(res) {
                                const token = jwt.sign({ userName, password }, _secret, { expiresIn: '1h' });
                                const cookieOptions = {
                                    httpOnly: true,
                                    path: '/',
                                    domain: 'localhost'
                                };

                                response.cookie('accessToken', token, cookieOptions);
                                user = new UserController(userName, password);
                                //userTrips = new TripController(userName);
                                
                                response.append('Access-Token', token);
                                response.redirect('/user');
                            } else {
                                response.status(400).send({
                                    success: false,
                                    message:'Грешна парола'
                                });
                            }
                        });
                    });
                } else {
                    response.status(404).send({
                        success: false,
                        message: 'Грешно потребителско име'
                    });
                }
            });
});


logoutRouter.post("/", auth, (request: express.Request, response: express.Response) => {
    user = null;
    //userTrips = null;

    response.status(200).send({ success: true });
});

export { loginRouter, logoutRouter, user, userTrips };