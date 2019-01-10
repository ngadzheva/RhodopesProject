import { Base } from './base';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class Comments extends Base {
    private _landscapeName: string;
    private _comments: Array<Object>;

    constructor(landscape: string) {
        super('');
        this._landscapeName = landscape;
        this._comments = new Array();

        this.load();
    }

    get getComments(): Array<Object> {
        return this._comments;
    }

    public postComment(content: string, datePublished: Date, userName: string) {
        const comment: { [key: string]: any } = {
            content: content,
            datePublished: datePublished,
            landscapeName: this._landscapeName,
            user: userName
        }
        
        this._comments.push(comment);

        database.insertData(Collections[Collections.comments], comment);
    }

    private load() {
        database.queryData(Collections[Collections.comments], Fields[Fields.landscapeName], '==', this._landscapeName)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        this.setID = doc.id;
                        this._comments.push(doc.data());
                    });
                });
    }
}