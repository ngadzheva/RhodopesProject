import { database } from "./database";
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

let landscapes = new Map();
database.queryData("landscapes", "rhodopesPart", "==", "west").get()
            .then((snapshot: any) => {
                snapshot.forEach((doc: any) => {
                    console.log(doc.data());
                    landscapes.set(doc.data().name, doc.data());
                });
            }).then(() => {
               Object.entries(landscapes.get('Орлово око'));
                if(landscapes.has('Орлово око')){
                    console.log(landscapes.get('Орлово око'))
                }
            });

console.log('done');

const obj = {
    a: 'a',
    b: 'b'
}

let {a} = obj