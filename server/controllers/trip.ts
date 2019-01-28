import { Trip } from '../models/trip';

export class TripController {
    private _trips: Trip;

    constructor(user: string) {
        this._trips = new Trip(user);
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