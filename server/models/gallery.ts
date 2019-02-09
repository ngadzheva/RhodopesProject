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
                        if(doc.data().active) {
                            let folder = doc.data().folder;
                            this._folders.set(folder, doc.data().images as Array<String>);
                        }
                    });
                });
    }

    get getFolders() {
        return this._folders;
    }

    public getFolderImages(folder: string): Array<String> | undefined {
        return this._folders.get(folder);
    }

    public setFolderImages(folder: string, images: Array<String>) {
        this._folders.set(folder, images);

        database.updateData(Collections[Collections.gallery], Fields[Fields.folder], '==', folder, { images });
    }

    public uploadImage(folder: string, directory: string, path: string) {
        database.uploadImage(directory, path).then((data: any) => {
            if(this._folders.get(folder)) {
                (this._folders.get(folder) as Array<String>).push(data);

                database.updateData(Collections[Collections.gallery], Fields[Fields.folder], '==', folder, { images: this._folders.get(folder) });
            } else {
                const images = new Array<String>();
                images.push(data);
                this._folders.set(folder, images);

                const dataToInsert = {
                    active: true,
                    folder,
                    images,
                    parentFolder: directory
                };

                database.insertData(Collections[Collections.gallery], dataToInsert);
            }
        });
    }

    public deleteAlbum(landscape: string) {
        this._folders.delete(landscape);
        database.updateData(Collections[Collections.gallery], Fields[Fields.folder], '==', landscape, { active: false });
    }
}