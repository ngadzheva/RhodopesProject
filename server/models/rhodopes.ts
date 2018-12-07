import { database } from '../db/database';
import { Landmark } from './landmark';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';

export class Rhodopes {
    private _rhodopesPart: string;
    private _landscapes: any;

    constructor(rhodopesPart: string) {
        this._rhodopesPart = rhodopesPart;
        this._landscapes = new Map();

        this.getRhodopesPartLandscapes();
    }

    private getRhodopesPartLandscapes() {
        database.queryData(Collections[Collections.landscapes], Fields[Fields.rhodopesPart], '==', this._rhodopesPart)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        let landscapeName = doc.data().name;
                        this._landscapes.set(landscapeName, doc.data());
                    });
                });
    }

    get getLandscapes() {
        return this._landscapes;
    }

    public getLandscapeInfo(landscape: string): { [key: string]: any } {
        return this._landscapes.get(landscape); 
    }
}