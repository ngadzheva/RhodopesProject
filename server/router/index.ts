import { Application } from 'express';
import { userRouter } from './user';
import { landscapeRouter } from './landscape';

export function connectRouter(app: Application){
    app.use('/user', userRouter);
    app.use('/landscapes', landscapeRouter);
}