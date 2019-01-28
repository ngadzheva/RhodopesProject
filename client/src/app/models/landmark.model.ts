export interface Landmark {
    description: string;
    entranceFee: number;
    image: string;
    latitude: number;
    longitutde: number;
    location: string;
    name: string;
    hotels: Array<{ [key: string]: any }>;
    rating: number;
    rhodopesPart: string;
    shortInfo: string;
    transitionTime: string;
    workTime: string;
}