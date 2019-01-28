import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class Comments {
    private _landscapeName: string;
    private _comments: Array<{ [key: string]: any }>;

    constructor(landscape: string) {
        this._landscapeName = landscape;
        this._comments = new Array();

        this.load();
    }

    get getComments(): Array<{ [key: string]: any }> {
        return this._comments;
    }

    public postComment(comment: { [key: string]: any }) {       
        this._comments.push(comment);

        database.insertData(Collections[Collections.comments], comment);
    }

    private load() {
        database.queryData(Collections[Collections.comments], Fields[Fields.landscapeName], '==', this._landscapeName)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        this._comments.push(doc.data());
                    });
                });
    }
}