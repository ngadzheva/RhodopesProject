import { Landmark } from '../models/landmark';
import { Rhodopes } from '../models/rhodopes';
import { Comments } from '../models/comments';

export class LandmarkController {
    private _landscape: Landmark;
    
    constructor(landscape: { [key: string]: any }){
        this._landscape = new Landmark(landscape);
    }

    public viewLandscapeInfo(): object {
        let info: { [key: string]: any } = {};

        info.description = this._landscape.getDescription;
        info.entranceFee = this._landscape.getEntranceFee;
        info.location = this._landscape.getLocation;
        info.name = this._landscape.getName;
        info.hotels = this._landscape.getHotels;
        info.rating = this._landscape.getRating;
        info.rhodopesPart = this._landscape.getRhodopesPart;
        info.shortInfo = this._landscape.getShortInfo;
        info.transitionTime = this._landscape.getTransitionTime;
        info.workTime = this._landscape.getWorkTime;

        return info;
    }

    public vote(voteType: string): void {
        //let landscape = new Landmark(landscapeName, rhodopesPart);
        //landscape.load();
        this._landscape.setRating = voteType === 'like' ? this._landscape.getRating + 1 : this._landscape.getRating - 1;
    }

    public postComment(content: string, datePublished: Date, landscape: string, user: string): void {
        const comment = new Comments(content, datePublished, landscape, user);
        comment.postComment();
    }

    public getComments(landscape: string): object {
        return new Comments('', new Date(), '', '').getComments(landscape);
    }
}