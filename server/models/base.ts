import { IBase } from '../interfaces/base';

export class Base{
    private _id: string;

    constructor(id: string){
        this._id = id;
   }

   getID(): string{
       return this._id;
   }

   setID(id: string): void{
       this._id = id;
   }
}