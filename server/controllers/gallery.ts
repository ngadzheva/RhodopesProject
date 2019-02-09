import { Gallery } from '../models/gallery';

export class GalleryController {
    private _gallery: Gallery;
    private _rhodopesPart: string;

    constructor(rhodopesPart: string) {
        this._rhodopesPart = rhodopesPart;
        this._gallery = new Gallery(rhodopesPart);
    }

    public getImageAlbums(): Array<Object> {
        let albums: Array<Object> = new Array();
        const folders = this._gallery.getFolders;

        folders.forEach((value: String[], key: String, folders) => {
            let landscapeGallery = {
                rhodopesPart: this._rhodopesPart,
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

    public removeLandscapeImage(landscape: string, image: string) {
        let imageToRemove: String = '';
        const landscapeImages = this._gallery.getFolderImages(landscape) as  Array<String>;

        landscapeImages.forEach((landscapeImage, index) => {
            if(landscapeImage.includes('token=' + image)) {
                imageToRemove = landscapeImage;
            }
        });
        
        const indexToRemove = (this._gallery.getFolderImages(landscape) as  Array<String>).indexOf(imageToRemove);
        (this._gallery.getFolderImages(landscape) as  Array<String>).splice(indexToRemove, 1);
        this._gallery.setFolderImages(landscape, this._gallery.getFolderImages(landscape) as  Array<String>);
    }

    public createAlbum(parentFolder: string, folder: string, imagePath: string) {
        let currentImageDirectory = 'rhodopes/' + parentFolder + '/' + folder + '/';
        this._gallery.uploadImage(folder, currentImageDirectory, imagePath);
    }

    public uploadImage(directory: string, path: string) {
        const fullDirectoryPath = 'rhodopes/' + this._rhodopesPart + '/' + directory + '/';
        this._gallery.uploadImage(directory, fullDirectoryPath, path);
    }

    public removeLandscapeAlbum(landscape: string) {
        this._gallery.deleteAlbum(landscape);
    }
}