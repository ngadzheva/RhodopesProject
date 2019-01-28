const admin = require('firebase-admin');

const serviceAccount = require('../../rhodope-ee682-firebase-adminsdk-jts1t-652eec230c.json');
const functions = require('firebase-functions');
import '@firebase/storage';

class DataBase {
    private _dbInstance: any;
    private _storage: any;

    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: 'rhodope-ee682.appspot.com'
        });
        
        this._dbInstance = admin.firestore();
        this._storage = admin.storage().bucket();  
    }

    public insertData(collection: string, data: object): void {
        this._dbInstance.collection(collection).add(data);
    }   

    public updateData(collection: string, field: string, condition: string, value: string, dataToUpdate: object): void{
        let collectionRef = this._dbInstance.collection(collection);

        this.queryData(collection, field, condition, value)
            .get()
            .then((result: any) => {
                result.forEach((doc: any) => {
                    var transaction = this._dbInstance.runTransaction((t: any) => {
                        let toUpdate = collectionRef.doc(doc.id);
                        return t.get(toUpdate)
                        .then((doc: any) => {
                            t.update(toUpdate, dataToUpdate);
                    }).then(() => {
                        console.log('Transaction success');
                    }).catch(() => {
                        console.log('Transaction failure:');
                    });
                    });
                });
            });
    }

    public queryData(collection: string, field: string, condition: string, value: any): any {
        return this._dbInstance.collection(collection).where(field, condition, value);     
    }

    public uploadImage(path: string) {
        //const file = this._storage.file(name);
        return this._storage.upload(path, {
            uploadType: "media",
                metadata: {
                contentType: 'image/jpg'
                }
            }).then((data: any) => {
                let file = data[0];
                console.log(file.name);
                return Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + this._storage.name + "/o/" + encodeURIComponent(file.name) + "?alt=media");
              });
    }
}

export const database = new DataBase();