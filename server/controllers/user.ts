import { User } from '../models/user';

export class UserController {
    private _user: User;

    constructor(user: { [key: string]: any }) {
        this._user = new User(user);
    }

    public getUserName(): string {
        return this._user.getUserName;
    }

    public getPassword(): string {
        return this._user.getPassword;
    }

    public getUserRole(): string {
        return this._user.getRole;
    }

    public viewProfileInfo():  { [key: string]: any} {
        const info: { [key: string]: any} = {};

        info.userName = this._user.getUserName;
        info.email = this._user.getEmail;
        info.image = this._user.getImage;
        info.password = this._user.getPassword;
        info.role= this._user.getRole;

        return info;
    }

    public updateInfo(userName: string, email: string, password: string): void {
        if(this._user.getUserName !== userName) {
            this._user.updateCommentsUser(userName);
            this._user.updateTripsUser(userName);
        }

        this._user.updateInfo(userName, email, password);
    }

    public uploadImage(directory: string, path: string) {
        this._user.setImage(directory, path);
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
        const favoriteList = this._user.getFavorite;

        favoriteList.sort();

        return favoriteList;
    }

    public getVisitedList(): string[] {
        const visitedList = this._user.getVisited;

        visitedList.sort();

        return visitedList;
    }

    public getWantToVisitList(): string[] {
        const wantToVisitList = this._user.getWantToVisit;

        wantToVisitList.sort();

        return wantToVisitList;
    }

    public listUserTrips(): Array<{ [key: string]: any }> {
        const trips = this._user.getUserTrips;

        trips.sort((trip1, trip2) => {
            const date1 = new Date(trip1.plan[0].date);
            const date2 = new Date(trip2.plan[0].date);
            
            if (date1 < date2) {
                return 1;
            } else if (date1 > date2) {
                return -1;
            } else {
                if(trip1.name < trip2.name) {
                    return -1;
                } else if(trip1.name > trip2.name) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        
        return trips;
    }

    public addUserTrip(trip: { [key: string]: any }) {
        if(!trip.name) {
            trip.name = 'Неозаглавено пътуване';
        }
        
        this._user.setUserTrip(trip);
    }
}