import { IBase } from './base';

export interface ILandmark extends IBase {
    _description: string;
    _entranceFee: number;
    _location: string;
    _name: string;
    _hotels: Array<Object>;
    _rating: number;
    _rhodopesPart: string;
    _shortInfo: string;
    _transitionTime: string;
    _workTime: string;
}