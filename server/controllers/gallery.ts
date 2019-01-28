import { Gallery } from '../models/gallery';

export class GalleryController {
    private _gallery: Gallery;

    constructor(rhodopesPart: string) {
        this._gallery = new Gallery(rhodopesPart);
    }

    public getImageAlbums(): Array<Object> {
        let albums: Array<Object> = new Array();
        const folders = this._gallery.getFolders;

        folders.forEach((value: String[], key: String, folders) => {
            let landscapeGallery = {
                landscape: key,
                images: value[0]
            };

            albums.push(landscapeGallery);
        });

        return albums;
    }

    public getLandscapeGallery(landscape: string): Array<String> | undefined {
        return this._gallery.getFolderImages(landscape);
    }
}