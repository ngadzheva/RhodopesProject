import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
//const cp = require('cookie-parser');

const loginRouter = express.Router();
//loginRouter.use(cp());
const _secret = 'secret';

import { database } from '../db/database';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';

loginRouter.post('/', (request: express.Request, response: express.Response) => {
    const { userName, password } = request.body;

    if(!userName && !password) {
        response.send('Въведете потребителско име и парола.');
    } else if(!userName){
        response.send('Въведете потребителско име.');
    } else if(!password){
        response.send('Въведете парола.');
    } else {
        database.queryData(Collections[Collections.users], Fields[Fields.userName], '==', userName)
                .get().then((snapshot: any) => {
                    snapshot.forEach((doc: any) => {
                        if(doc.data()){
                            bcrypt.compare(password, doc.data().password).then(function(res) {
                                if(res) {
                                    const token = jwt.sign({ userName }, _secret, { expiresIn: '1h' });
                                    response.json({
                                        success: true,
                                        message: '',
                                        token: token
                                    });
                                    response.redirect('/users/info');
                                } else {
                                    response.send('Грешна парола');
                                }
                            });
                        } else {
                            response.send('Грешно потребителско име');
                        }
                    });
                });
    }
});

export { loginRouter };