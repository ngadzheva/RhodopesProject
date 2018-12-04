import { Base } from './base';
import { IUser } from '../interfaces/user';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class User extends Base<IUser> {
    private _email: string;
    private _favorite: string[];
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
        this._visited = [];
        this._wantToVisit = [];

        this.load();
    }

    public load() {
        // let usersRef = database.queryData('users', 'userName', '==', this._userName).get();
        // usersRef.then((snapshot: any) => {
        //     snapshot.forEach((currentUser:any) => {
        //         this.setID(currentUser.id);
        //         this._email = currentUser.email;
        //         this._favorite = currentUser.favorite;
        //         this._visited = currentUser.visited;
        //         this._wantToVisit = currentUser.wantToVisit;

        //         user.uid = currentUser.id;
        //         user.email = this._email;
        //         user.favorite = this._favorite;
        //         user.password = this._password;
        //         user.userName = this._userName;
        //         user.visited = this._visited;
        //         user.wantToVisit = this._wantToVisit;
        //     });
        // });
        database.queryData(Collections[Collections.users], Fields[Fields.userName], '==', this._userName)
            .onSnapshot((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                    this.setID(doc.id);
                    this._email = doc.data().email;
                    this._favorite = doc.data().favorite;
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

        database.insertData(Collections[Collections.landscapes], newUser);
    }

    get getEmail() {
        return this._email;
    }
    
    set setEmail(email: string) {
        this._email = email;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.userName], 
            '==', this._userName, { email: this._email });
    }

    get getFavorite() {
        return this._favorite;
    }
    
    set setFavorite(favorite: string[]) {
        this._favorite = favorite;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.userName], 
            '==', this._userName, { favorite: this._favorite });
    }

    get getPassword() {
        return this._password;
    }
    
    set setPassword(password: string) {
        this._password = password;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.userName], 
            '==', this._userName, { password: this._password });
    }

    get getUserName() {
        return this._userName;
    }
    
    set setUserName(userName: string) {
        this._userName = userName;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.userName], 
            '==', this._userName, { useName: this._userName });
    }

    get getVisited() {
        return this._visited;
    }
    
    set setVisited(visited: string[]){
        this._visited = visited;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.userName], 
            '==', this._userName, { visited: this._visited });
    }

    get getWantToVisit() {
        return this._wantToVisit;
    }
    
    set setWantToVisit(wantToVisit: string[]) {
        this._wantToVisit = wantToVisit;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.userName], 
            '==', this._userName, { wantToVisit: this._wantToVisit });
    }
}