export interface ITrip {
    done: boolean;
    name: string;
    plan: Array<{ [key: string]: any }>;
    user: string;
    startPoint: string;
}