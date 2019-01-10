import * as express from 'express';
import { auth } from '../middleware/auth';
import { user } from './login';

const tripsRouter = express.Router();

import { TripController } from '../controllers/trip';

const trips: TripController = new TripController();

tripsRouter.post('/', auth, (request: express.Request, response: express.Response) => {
    const { startPoint, name, plan } = request.body;
    const tripToAdd = {
        done: false,
        name,
        plan,
        user,
        startPoint    
    };

    trips.addNewTrip(tripToAdd);

    response.status(200).send({ success: true });
});

export { tripsRouter };