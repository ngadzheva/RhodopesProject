import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { database } from '../db/database';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { UserController } from '../controllers/user';
import { auth } from '../middleware/auth';
import { config } from '../config/config';

const loginRouter = express.Router();
const logoutRouter = express.Router();

let user: any;
let decryptionDone = true;

loginRouter.post('/', (request: any, response: express.Response) => {
    const { userName, password } = request.body;
    
    database.queryData(Collections[Collections.users], Fields[Fields.userName], '==', userName)
            .get().then((snapshot: any) => {
                if(snapshot.docs.length > 0) {
                    snapshot.forEach((doc: any) => {
                        bcrypt.compare(password, doc.data().password).then((res) => {
                            decryptionDone = !decryptionDone;
                            
                            if(res) {
                                const token = jwt.sign({ userName, password, role: doc.data().role }, config.jwtKey, { expiresIn: '1h' });

                                user = new UserController(doc.data());

                                response.status(200).send({
                                    success: true,
                                    userRole: doc.data().role,
                                    token
                                });
                            }

                            if(decryptionDone && !res) {
                                response.status(404).send({
                                    success: false,
                                    message: 'Грешна парола'
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

    response.status(200).send({ success: true });
});

export { loginRouter, logoutRouter, user };
