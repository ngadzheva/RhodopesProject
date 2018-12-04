import { IBase } from './base'

export interface IUser extends IBase {
    _email: string;
    _favorite: string[];
    _password: string;
    _userName: string;
    _visited: string[];
    _wantToVisit: string[];
}