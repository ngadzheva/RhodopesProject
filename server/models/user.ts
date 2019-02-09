import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';
import { Trips } from './trips';
import { UserRoles } from '../enums/userRoles';

export class User {
    private _email: string;
    private _favorite: string[];
    private _image: any;
    private _password: string;
    private _userName: string;
    private _visited: string[];
    private _wantToVisit: string[];
    private _userTrips: Trips;
    private _userRole: string;

    constructor(user: {[key: string]: any }) {
        this._password = user.password;
        this._userName = user.userName;

        this._email = user.email;
        this._favorite = user.favorite;
        this._image = user.image;
        this._visited = user.visited;
        this._wantToVisit = user.wantToVisit;
        this._userTrips = new Trips(this._userName);
        this._userRole = user.role;
    }

    public updateInfo(userName: string, email: string, password: string): void {
        database.updateData(Collections[Collections.users], Fields[Fields.userName], 
            '==', this._userName, { userName, email, password });

        this._userName = userName;
        this._email = email;
        this._password = password;
    }

    get getEmail() {
        return this._email;
    }
    
    set setEmail(email: string) {
        this._email = email;

        database.updateData(Collections[Collections.users], Fields[Fields.userName], 
            '==', this._userName, { email: this._email });
    }

    get getRole() {
        return this._userRole;
    }

    get getFavorite() {
        return this._favorite;
    }
    
    set setFavorite(favorite: string[]) {
        this._favorite = favorite;

        this.updateLandscapesList(Fields[Fields.favorite], this._favorite);
    }

    get getImage() {
        return this._image;
    }

    public setImage(directory: string, path: string) {
        database.uploadImage(directory, path).then((data: any) => {
            this._image = data;

            database.updateData(Collections[Collections.users], Fields[Fields.userName], 
                '==', this._userName, { image: this._image });
        });
    }

    get getPassword() {
        return this._password;
    }
    
    set setPassword(password: string) {
        this._password = password;

        database.updateData(Collections[Collections.users], Fields[Fields.userName], 
            '==', this._userName, { password: this._password });
    }

    get getUserName() {
        return this._userName;
    }
    
    set setUserName(userName: string) {
        const oldUserName = this._userName;
        this._userName = userName;

        database.updateData(Collections[Collections.users], Fields[Fields.userName], 
            '==', oldUserName, { userName: this._userName });
    }

    get getVisited() {
        return this._visited;
    }
    
    set setVisited(visited: string[]){
        this._visited = visited;

        this.updateLandscapesList(Fields[Fields.visited], this._visited);
    }

    private updateLandscapesList(listType: string, landscapes: string[]) {
        database.updateData(Collections[Collections.users], Fields[Fields.userName], 
            '==', this._userName, { [listType]: landscapes });
    }

    get getWantToVisit() {
        return this._wantToVisit;
    }
    
    set setWantToVisit(wantToVisit: string[]) {
        this._wantToVisit = wantToVisit;

        this.updateLandscapesList(Fields[Fields.wantToVisit], this._wantToVisit);
    }

    public updateCommentsUser(userName: string): void {
        database.updateData(Collections[Collections.comments], Fields[Fields.user], "==", this._userName, { user: userName });
    }

    public updateTripsUser(userName: string): void {
        database.updateData(Collections[Collections.trips], Fields[Fields.user], "==", this._userName, { user: userName });
    }

    get getUserTrips(): Array<{ [key: string]: any }> {
        return this._userTrips.getTrips;
    }

    public setUserTrip(trip: { [key: string]: any }) {
        this._userTrips.addTrip(trip);
    }
}