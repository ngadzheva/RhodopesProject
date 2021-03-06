import * as express from 'express';
import * as bcrypt from 'bcrypt';

import { database } from '../db/database';
import { UserRoles } from '../enums/userRoles';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';

const registerRouter = express.Router();

registerRouter.post('/', (request: express.Request, response: express.Response) => {
    const { userName, password, email } = request.body;

    database.queryData(Collections[Collections.users], Fields[Fields.userName], '==', userName)
        .get().then((snapshot: any) => {
            snapshot.forEach((doc: any) => {
                if(doc.data()){
                    response.status(409).send({
                        success: false,
                        message: 'Съществува потребител с въведеното потребителско име.'
                    });
                    Promise.reject();
                } 
            });
        }).then(() => {
            bcrypt.hash(password, 10).then(function(hash) {
                database.insertData(Collections[Collections.users], { userName, password: hash, email, role: UserRoles[UserRoles.user], favorite: [], visited: [], wantToVisit: [] });
                response.status(200).send({
                    success: true
                });
            });
        });   
});

export { registerRouter }