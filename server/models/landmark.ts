import { Base } from './base';
import { ILandmark } from '../interfaces/landmark';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class Landmark extends Base<ILandmark>{
    private _description: string;
    private _entranceFee: number;
    private _location: string;
    private _name: string;
    private _hotels: Array<Object>;
    private _rating: number;
    private _rhodopesPart: string;
    private _shortInfo: string;
    private _transitionTime: string;
    private _workTime: string;

    constructor(landscape: { [key: string]: any }) {//constructor(name: string, rhodopesPart: string) {
        let { description, entranceFee, location, name, hotels, rating, rhodopesPart, shortInfo, transitionTime, workTime } = landscape;
        
        super('');

        this._description = description;
        this._entranceFee = entranceFee;
        this._location = location;
        this._name = name;
        this._hotels = hotels;
        this._rating = rating;
        this._rhodopesPart = rhodopesPart;
        this._shortInfo = shortInfo;
        this._transitionTime = transitionTime;
        this._workTime = workTime;

        //this.load();
    }

    // public load() {
    //     database.queryData(Collections[Collections.landscapes], Fields[Fields.name], '==', this._name)
    //             .onSnapshot((querySnapshot: any) => {
    //                 querySnapshot.forEach((doc: any) => {
    //                     this.setID(doc.id);
    //                     this._description = doc.data().description;
    //                     this._entranceFee = doc.data().entranceFee;
    //                     this._location = doc.data().location;
    //                     this._hotels = doc.data().hotels;
    //                     this._rating = doc.data().rating;
    //                     this._shortInfo = doc.data().shortInfo;
    //                     this._transitionTime = doc.data().transitionTime;
    //                     this._workTime = doc.data().workTime;
    //                 });
    //             });
    // }

    get getDescription(){
        return this._description;
    }

    set setDescription(description: string){
        this._description = description;
    }

    get getEntranceFee(){
        return this._entranceFee;
    }

    set setEntranceFee(entranceFee: number){
        this._entranceFee = entranceFee;
    }

    get getLocation(){
        return this._location;
    }

    set setLocation(location: string){
        this._location = location;
    }

    get getName(){
        return this._name;
    }

    set setName(name: string){
        this._name = name;
    }

    get getHotels(){
        return this._hotels;
    }

    set setHotels(hotels: Array<Object>){
        this._hotels = hotels;
    }

    get getRating(){
        return this._rating;
    }

    set setRating(rating: number){
        this._rating = rating;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.name], 
                '==', this._name, {rating: this._rating});
    }

    get getRhodopesPart(){
        return this._rhodopesPart;
    }

    set setRhodopesPart(rhodopesPart: string){
        this._rhodopesPart = rhodopesPart;
    }

    get getShortInfo(){
        return this._shortInfo;
    }

    set setShortInfo(shortInfo: string){
        this._shortInfo = shortInfo;
    }

    get getTransitionTime(){
        return this._transitionTime;
    }

    set setTransitionTime(transitionTime: string){
        this._transitionTime = transitionTime;
    }

    get getWorkTime(){
        return this._workTime;
    }

    set setWorkTime(workTime: string){
        this._workTime = workTime;
    }
}