import { database } from '../db/database';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';

export class Trip {
    private _trips: Array<{ [key: string]: any }>;

    constructor(){
        this._trips = new Array();
    }

    public loadTrip(user: string): void {
        database.queryData(Collections[Collections.trips], Fields[Fields.user], '==', user)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        this._trips.push(doc.data());
                    });
                });
    }

    public addTrip(trip: { [key: string]: any }): void {
        database.insertData(Collections[Collections.trips], trip);
    }

    get getTrips(): Array<{ [key: string]: any }> {
        return this._trips;
    }
}