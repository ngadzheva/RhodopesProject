export interface ILandmark {
    active: boolean;
    description: string;
    entranceFee: number;
    image: string;
    latitude: number;
    longitude: number;
    location: string;
    name: string;
    hotels: Array<{ [key: string]: any }>;
    rating: number;
    rhodopesPart: string;
    shortInfo: string;
    transitionTime: string;
    workTime: string;
    isFavorite: boolean;
    isVisited: boolean;
    isWantToVisit: boolean;
}