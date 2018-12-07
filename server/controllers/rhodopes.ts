import { Landmark } from '../models/landmark';
import { Rhodopes } from '../models/rhodopes';
import { Comments } from '../models/comments';

export class RhodopesController {
    private _landscape: Rhodopes;
    
    constructor(rhodopesPart: string) {
        this._landscape = new Rhodopes(rhodopesPart);
    }

    public viewLandscapes() {
        return this._landscape.getLandscapes;
    }

    public getLandscape(landscapeName: string): { [key: string]: any } {
        return this._landscape.getLandscapeInfo(landscapeName); 
    }
}