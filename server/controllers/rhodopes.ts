import { Rhodopes } from '../models/rhodopes';

export class RhodopesController {
    private _landscape: Rhodopes;
    private _rhodopesPart: string;
    
    constructor(rhodopesPart: string) {
        this._rhodopesPart = rhodopesPart;
        this._landscape = new Rhodopes(rhodopesPart);
    }

    public viewLandscapes(): Map<string, { [key: string]: any }> {
        return this._landscape.getLandscapes;
    }

    public getLandscape(landscapeName: string): { [key: string]: any } | undefined{
        return this._landscape.getLandscapeInfo(landscapeName); 
    }

    public addLandscape(landscape: { [key: string]: any }) {
        if(!landscape.hotels) {
            landscape.hotels = [];
        }

        if(!landscape.entranceFee) {
            landscape.entranceFee = '';
        }

        if(!landscape.workTime) {
            landscape.workTime = '';
        }

        if(!landscape.image) {
            landscape.image = '';
        }

        landscape.rating = 0;

        this._landscape.createLandscape(landscape);
    }

    public uploadImage(directory: string, path: string) {
        const fullDirectoryPath = 'rhodopes/' + this._rhodopesPart + '/' + directory + '/';
        this._landscape.uploadImage(directory, fullDirectoryPath, path);
    }

    public removeLandscape(landscape: string) {
        this._landscape.deleteLandscape(landscape);
    }
}