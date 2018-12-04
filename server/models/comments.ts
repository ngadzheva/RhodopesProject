import { Base } from './base';
import { IComments } from '../interfaces/comments';
import { Collections } from '../enums/collections';
import { Fields } from '../enums/fields';
import { database } from '../db/database';

export class Comments<IComments> {
    private _content: string;
    private _datePublished: Date;
    private _landscapeName: string;
    private _userName: string;

    constructor(content: string, datePublished: Date, landscape: string, user: string) {
        this._content = content;
        this._datePublished = datePublished;
        this._landscapeName = landscape;
        this._userName = user;
    }

    public postComment() {
        const comment: { [key: string]: any } = {
            content: this._content,
            datePublished: this._datePublished,
            landscapeName: this._landscapeName,
            useName: this._userName
        }

        database.insertData(Collections[Collections.comments], comment);
    }

    public getComment(): object {
        return {
            content: this._content,
            datePublished: this._datePublished,
            landscapeName: this._landscapeName,
            useName: this._userName
        }
    } 

    public getComments(landscape: string): Array<Object> {
        let comments: Array<Object> = new Array();

        database.queryData(Collections[Collections.comments], Fields[Fields.landscapeName], '==', landscape)
                .onSnapshot((querySnapshot: any) => {
                    querySnapshot.forEach((doc: any) => {
                        this._content = doc.data().content;
                        this._datePublished = doc.data().datePublished;
                        this._landscapeName = landscape;
                        this._userName = doc.data().useName;

                        let comment: { [key: string]: any } = {
                            content: this._content,
                            datePublished: this._datePublished,
                            landscapeName: this._landscapeName,
                            useName: this._userName
                        }

                        comments.push(comment);
                    });
                });

        return comments;
    }
}