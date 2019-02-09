import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';
import { Comments } from './comments';

export class Landmark {
    private _active: boolean;
    private _description: string;
    private _entranceFee: number;
    private _image: string;
    private _latitude: number;
    private _longitutde: number;
    private _location: string;
    private _name: string;
    private _hotels: Array<Object>;
    private _rating: number;
    private _rhodopesPart: string;
    private _shortInfo: string;
    private _transitionTime: string;
    private _workTime: string;
    private _comments: Comments;

    constructor(landscape: { [key: string]: any }) {
        let { active, description, entranceFee, image, latitude, longitude, location, name, hotels, rating, rhodopesPart, shortInfo, transitionTime, workTime } = landscape;

        this._active = active;
        this._description = description;
        this._entranceFee = entranceFee;
        this._image = image;
        this._latitude = latitude;
        this._longitutde = longitude;
        this._location = location;
        this._name = name;
        this._hotels = hotels;
        this._rating = rating;
        this._rhodopesPart = rhodopesPart;
        this._shortInfo = shortInfo;
        this._transitionTime = transitionTime;
        this._workTime = workTime;

        this._comments = new Comments(this._name);
    }

    public updateLandscapeData(newData: { [key: string]: any }) {
        const oldName = this._name;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.name], 
            '==',oldName, newData);

        this._description = newData.description;
        this._entranceFee = newData.entranceFee;
        this._image = newData.image;
        this._latitude = newData.latitude;
        this._longitutde = newData.longitude;
        this._location = newData.location;
        this._name = newData.name;
        this._hotels = newData.hotels;
        this._rating = newData.rating;
        this._rhodopesPart = newData.rhodopesPart;
        this._shortInfo = newData.shortInfo;
        this._transitionTime = newData.transitionTime;
        this._workTime = newData.workTime;
    }

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

    get getImage() {
        return this._image;
    }

    set setImage(url: string) {
        this._image = url;
    }

    get getLatitude() {
        return this._latitude;
    }

    get getLongitude() {
        return this._longitutde;
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

    get getComments(): Array<{ [key: string]: any }> {
        return this._comments.getComments;
    }

    public setComment(comment: { [key: string]: any }){
        this._comments.postComment(comment);
    }
}