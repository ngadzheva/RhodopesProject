import { IBase } from './base';

export interface IComments extends IBase {
    _content: string;
    _datePublished: Date;
    _landscapeName: string;
    _userName: string;
}