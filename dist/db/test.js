"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
// const express = require('express');
// //import * as bodyParser from 'body-parser';
// const port = 3000;
// const app = express();
// app.get('/', (req: any, res: any) => {
//     database.insertData("hotels", {name: "name"});
//     /*database.queryData("users", "userName", "==", "hriss")
//             .onSnapshot((querySnapshot: any) => {
//                 querySnapshot.forEach((doc: any) => {
//                    res.send(doc.data());
//                 });
//             });*/
// });
// app.listen(port, () => {
//     console.log('Server is listenening on port 3000');
// });
//user.then((res: any) => console.log(res));
var landscapes = new Map();
database_1.database.queryData("landscapes", "rhodopesPart", "==", "west").get()
    .then(function (snapshot) {
    snapshot.forEach(function (doc) {
        console.log(doc.data());
        landscapes.set(doc.data().name, doc.data());
    });
}).then(function () {
    if (landscapes.has('Орлово око')) {
        console.log(landscapes.get('Орлово око'));
    }
});
console.log('done');
//# sourceMappingURL=test.js.map