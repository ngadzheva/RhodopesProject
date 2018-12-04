"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require('firebase-admin');
var serviceAccount = require('../../rhodope-ee682-firebase-adminsdk-jts1t-652eec230c.json');
var functions = require('firebase-functions');
/*const firebase = require("firebase/app");
const firestore = require("firebase/firestore");*/
var DataBase = /** @class */ (function () {
    //app = firebase.app();
    function DataBase() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        this._dbInstance = admin.firestore(); //db.database();
    }
    DataBase.prototype.insertData = function (collection, data) {
        this._dbInstance.collection(collection).add(data);
    };
    DataBase.prototype.updateData = function (collection, field, condition, value, dataToUpdate) {
        var _this = this;
        var collectionRef = this._dbInstance.collection(collection);
        this.queryData(collection, field, condition, value)
            .get()
            .then(function (result) {
            result.forEach(function (doc) {
                var transaction = _this._dbInstance.runTransaction(function (t) {
                    var toUpdate = collectionRef.doc(doc.id);
                    return t.get(toUpdate)
                        .then(function (doc) {
                        t.update(toUpdate, dataToUpdate);
                    }).then(function () {
                        console.log('Transaction success');
                    }).catch(function () {
                        console.log('Transaction failure:');
                    });
                });
            });
        });
    };
    DataBase.prototype.queryData = function (collection, field, condition, value) {
        return this._dbInstance.collection(collection).where(field, condition, value);
    };
    return DataBase;
}());
exports.database = new DataBase();
//# sourceMappingURL=database.js.map