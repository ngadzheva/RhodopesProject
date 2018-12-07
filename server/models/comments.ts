import { Base } from './base';
import { IComments } from '../interfaces/comments';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class Comments extends Base {
    // private _content: string;
    // private _datePublished: Date;
    private _landscapeName: string;
    // private _userName: string;
    private _comments: Array<Object>;

    constructor(landscape: string) {
        // this._content = content;
        // this._datePublished = datePublished;
        super('');
        this._landscapeName = landscape;
        this._comments = new Array();

        this.load();
        // this._userName = user;
    }

    get getComments(): Array<Object> {
        return this._comments;
    }

    public postComment(content: string, datePublished: Date, userName: string) {
        const comment: { [key: string]: any } = {
            content: content,
            datePublished: datePublished,
            landscapeName: this._landscapeName,
            useName: userName
        }
        
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