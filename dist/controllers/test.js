"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
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
var user = new user_1.UserController('heartbeat', 'jjj');
console.log(user.viewProfileInfo());
console.log("done");
//# sourceMappingURL=test.js.map