import { Landmark } from '../models/landmark';

export class LandmarkController {
    private _landscape: Landmark;
    
    constructor(landscape: { [key: string]: any }){
        this._landscape = new Landmark(landscape);
    }

    public viewLandscapeInfo(): object {
        let info: { [key: string]: any } = {};

        info.description = this._landscape.getDescription;
        info.entranceFee = this._landscape.getEntranceFee;
        info.image = this._landscape.getImage;
        info.latitude = this._landscape.getLatitude;
        info.longitude = this._landscape.getLongitude;
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
        this._landscape.setRating = voteType === 'like' ? this._landscape.getRating + 1 : this._landscape.getRating - 1;
    }

    public postComment(content: string, datePublished: Date, user: string): void {
        const comment: { [key: string]: any } = {
            content: content,
            datePublished: datePublished,
            landscapeName: this._landscape.getName,
            user: user
        }

        this._landscape.setComment(comment);
    }

    public getComments(landscape: string): Array<{ [key: string]: any }> {
        const comments = this._landscape.getComments;

        comments.sort((comment1, comments2) => {
            const date1 = new Date(comment1.datePublished);
            const date2 = new Date(comments2.datePublished);
            
            if (date1 > date2) {
                return 1;
            } else if (date1 < date2) {
                return -1;
            } else {
                if(comment1.user < comments2.user) {
                    return -1;
                } else if(comment1.user > comments2.user) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })
        return comments;
    }

    public getRating(): number {
        return this._landscape.getRating;
    }
}