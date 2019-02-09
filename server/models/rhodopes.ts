import { database } from '../db/database';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';

export class Rhodopes {
    private _rhodopesPart: string;
    private _landscapes: Map<string, { [key: string]: any }>;

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

    get getLandscapes(): Map<string, { [key: string]: any }> {
        return this._landscapes;
    }

    public getLandscapeInfo(landscape: string): { [key: string]: any } | undefined{
        return this._landscapes.get(landscape); 
    }

    public createLandscape(landscape: { [key: string]: any }) {
        this._landscapes.set(landscape.name, landscape);
        database.insertData(Collections[Collections.landscapes], landscape);
    }

    public uploadImage(folder: string, directory: string, path: string) {
        database.uploadImage(directory, path).then((data: any) => {
            (this._landscapes.get(folder) as { [key: string]: any }).image = data;

            database.updateData(Collections[Collections.landscapes], Fields[Fields.name], '==', folder, { image: data });
        });
    }

    public deleteLandscape(landscape: string) {
        (this._landscapes.get(landscape) as { [key: string]: any }).active = false;

        database.updateData(Collections[Collections.landscapes], Fields[Fields.name], '==', landscape, { active: false });
    }
}