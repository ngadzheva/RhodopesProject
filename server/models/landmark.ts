import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';
import { Comments } from './comments';

export class Landmark {
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
        let { description, entranceFee, image, latitude, longitude, location, name, hotels, rating, rhodopesPart, shortInfo, transitionTime, workTime } = landscape;

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

    get getComments(): Array<Object> {
        return this._comments.getComments;
    }

    public setComment(content: string, datePublished: Date, user: string){
        this._comments.postComment(content, datePublished, user);
    }
}