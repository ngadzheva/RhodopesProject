import { Application } from 'express';
import { userRouter } from './user';
import { landscapeRouter } from './landscape';
import { loginRouter } from './login';

export function connectRouter(app: Application) {
    app.use('/login', loginRouter);
    app.use('/register', loginRouter);
    app.use('/user', userRouter);
    app.use('/landscapes', landscapeRouter);
}