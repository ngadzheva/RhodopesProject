import { User } from '../models/user';

export class UserController {
    private _user: User;

    constructor(userName: string, password: string) {
        this._user = new User(userName, password);
    }

    public getUserName(): string {
        return this._user.getUserName;
    }

    public getPassword(): string {
        return this._user.getPassword;
    }

    public viewProfileInfo():  { [key: string]: any} {
        const info: { [key: string]: any} = {};

        info.userName = this._user.getUserName;
        info.email = this._user.getEmail;
        info.image = this._user.getImage;
        info.password = this._user.getPassword;

        return info;
    }

    public updateInfo(userName: string, email: string, password: string): void {
        if(this._user.getUserName !== userName) {
            this._user.updateCommentsUser(userName);
            this._user.updateTripsUser(userName);
        }

        this._user.updateInfo(userName, email, password);
    }

    public uploadImage(path: string) {
        this._user.setImage(path);
    }

    public getImage(){
        return this._user.getImage;
    }

    public addFavorite(landscape: string): void {
        if(this._user.getFavorite.indexOf(landscape) === -1){
            this._user.getFavorite.push(landscape);
            this._user.setFavorite = this._user.getFavorite;
        } 
    }

    public addVisited(landscape: string): void {
        if(this._user.getVisited.indexOf(landscape) === -1){
            this._user.getVisited.push(landscape);
            this._user.setVisited = this._user.getVisited;
        } 
    }

    public addWantToVisit(landscape: string): void {
        if(this._user.getWantToVisit.indexOf(landscape) === -1){
            this._user.getWantToVisit.push(landscape);
            this._user.setWantToVisit = this._user.getWantToVisit;
        } 
    }

    public removeFavorite(landscape: string): void {
        const indexToRemove = this._user.getFavorite.indexOf(landscape);
        this._user.getFavorite.splice(indexToRemove, 1);
        this._user.setFavorite = this._user.getFavorite;
    }

    public removeVisited(landscape: string): void {
        const indexToRemove = this._user.getVisited.indexOf(landscape);
        this._user.getVisited.splice(indexToRemove, 1);
        this._user.setVisited = this._user.getVisited;
    }

    public removeWantToVisit(landscape: string): void {
        const indexToRemove = this._user.getWantToVisit.indexOf(landscape);
        this._user.getWantToVisit.splice(indexToRemove, 1);
        this._user.setWantToVisit = this._user.getWantToVisit;
    }

    public getFavoriteList(): string[] {
        return this._user.getFavorite;
    }

    public getVisitedList(): string[] {
        return this._user.getVisited;
    }

    public getWantToVisitList(): string[] {
        return this._user.getWantToVisit;
    }
}