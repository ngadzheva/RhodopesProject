import { Base } from './base';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class User extends Base {
    private _email: string;
    private _favorite: string[];
    private _image: any;
    private _password: string;
    private _userName: string;
    private _visited: string[];
    private _wantToVisit: string[];

    constructor(userName: string, password: string) {
        super('');

        this._password = password;
        this._userName = userName;

        this._email = '';
        this._favorite = [];
        this._image = undefined;
        this._visited = [];
        this._wantToVisit = [];

        this.load();
    }

    private load(): void {
        database.queryData(Collections[Collections.users], Fields[Fields.userName], '==', this._userName)
            .onSnapshot((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                    this.setID = doc.id;
                    this._userName = doc.data().userName;
                    this._password = doc.data().password;
                    this._email = doc.data().email;
                    this._favorite = doc.data().favorite;
                    this._image = doc.data().image;
                    this._visited = doc.data().visited;
                    this._wantToVisit = doc.data().wantToVisit;
                });
            });
    }

    public insert(userName: string, password: string, email: string): void {
        let newUser: object = {
            email,
            favorite: [],
            password,
            userName,
            visited: [],
            wantToVisit: []
        }

        database.insertData(Collections[Collections.users], newUser);
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

    setImage(path: string) {
        database.uploadImage(path).then((data: any) => {
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
}