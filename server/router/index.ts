import { Application } from 'express';
import { userRouter } from './user';
import { landscapeRouter } from './landscape';
import { tripsRouter } from './trips';
import { galleryRouter } from './gallery';
import { loginRouter, logoutRouter } from './login';
import { registerRouter } from './register';

export function connectRouter(app: Application) {
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/register', registerRouter);
    app.use('/user', userRouter);
    app.use('/landscapes', landscapeRouter);
    app.use('/tripplan', tripsRouter);
    app.use('/gallery', galleryRouter);
}