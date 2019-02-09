import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class Trips {
    private _trips: Array<{ [key: string]: any }>;

    constructor(user: string) {
        this._trips = new Array();

        this.load(user);
    }

    private load(user: string) {
        database.queryData(Collections[Collections.trips], Fields[Fields.user], '==', user)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        this._trips.push(doc.data());
                    });
                });
    }

    get getTrips(): Array<{ [key: string]: any }> {
        return this._trips;
    }

    public addTrip(trip: { [key: string]: any }) {       
        this._trips.push(trip);

        database.insertData(Collections[Collections.trips], trip);
    }
}