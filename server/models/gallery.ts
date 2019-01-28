import { database } from '../db/database';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';

export class Gallery {
    private _folders: Map<String, Array<String>>;
    private _parentFolder: string;

    constructor(rhodopesPart: string) {
        this._folders = new Map();
        this._parentFolder = rhodopesPart;

        this.load();
    }

    private load(): void {
        database.queryData(Collections[Collections.gallery], Fields[Fields.parentFolder], '==', this._parentFolder)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        let folder = doc.data().folder;
                        this._folders.set(folder, doc.data().images);
                    });
                });
    }

    get getFolders() {
        return this._folders;
    }

    public getFolderImages(folder: string): Array<String> | undefined {
        return this._folders.get(folder);
    }
}