import { Trip } from '../models/trip';

export class TripController {
    private _trips: Trip;

    constructor() {
        this._trips = new Trip();
    }

    public loadUserTrips(user: string): void {
        this._trips.loadTrip(user);
    }

    public addNewTrip(trip: { [key: string]: any }): void {
        this._trips.addTrip(trip);
    }

    public listUserTrips(): Array<{ [key: string]: any }> {
        return this._trips.getTrips;
    }
}