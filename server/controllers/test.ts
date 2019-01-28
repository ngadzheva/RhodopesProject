import { LandmarkController } from './landmark';
import { UserController } from './user';
import { Landmark } from '../models/landmark';
import { database } from '../db/database';
import * as bcrypt from 'bcrypt';

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

// let user = new UserController('heartbeat', 'jjj');

// console.log(user.viewProfileInfo());

// console.log("done")

bcrypt.hash("hhh", 10).then(function(hash) {
    console.log(hash);
});

bcrypt.compare("jj", "$2b$10$ClrTTyjcFaeqTvyQnEUcLOmFPa/X0DNqXH6X197Ols9q7trUKti9m").then(function(res) {
    console.log(res);
});