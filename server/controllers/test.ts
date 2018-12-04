import { LandmarkController } from './landmark';
import { UserController } from './user';
import { Landmark } from '../models/landmark';
import { database } from '../db/database';

// let landmarks = new LandmarkController('west');

// let toShow = landmarks.landmarks;

// console.log(toShow);

// for(let i = 0; i < toShow.length; i++){
//     let landscape = toShow[i];
//     console.log(landscape);
// }


// database.queryData('landscapes', 'rhodopesPart', '==', 'west')
//                 .onSnapshot((querySnapshot: any) => {
//                     querySnapshot.forEach((doc: any) => {
//                         console.log(doc.data());
//                     });
//                 });

let user = new UserController('heartbeat', 'jjj');

console.log(user.viewProfileInfo());

console.log("done")