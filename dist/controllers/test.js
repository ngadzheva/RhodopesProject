"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = __importStar(require("bcrypt"));
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
bcrypt.hash("hhh", 10).then(function (hash) {
    console.log(hash);
});
bcrypt.compare("jj", "$2b$10$ClrTTyjcFaeqTvyQnEUcLOmFPa/X0DNqXH6X197Ols9q7trUKti9m").then(function (res) {
    console.log(res);
});
//# sourceMappingURL=test.js.map