"use strict";
var DataAccess = require('./DataAccess');

class MongoDataAccess extends DataAccess
{
    constructor(db,mongodb)
    {
        super();
        this._db = db;
        this._mongodb = mongodb;
    }

    insert(collectionName,obj)
    {
        var executor = async function(resolve, reject)
        {
            this._db.collection(collectionName).insert(obj , function(err, result)
            {
                if(err!==null) {
                    reject('error inserting document');
                } else {
                    var insertedId = result['insertedIds'][0];
                    resolve(insertedId);
                }
            } );

        }.bind(this);
        return new Promise(executor);
    }

    remove(collectionName,filterObj)
    {
        var executor = function(resolve, reject)
        {
            this._db.collection(collectionName).remove(filterObj, function(err, result)
            {
                resolve(result);
            });
        }.bind(this);
        return new Promise(executor);
    }

    find(collectionName,filterObj)
    {
        var executor = function(resolve, reject)
        {
            var list = [];

            var cursor;
            if(filterObj===undefined) {
                cursor = this._db.collection(collectionName).find();
            } else {
                cursor = this._db.collection(collectionName).find(filterObj);
            }

            cursor.each(function(err, doc) {
                if(err!==null) {
                    reject('error getting document');
                } else {
                    if (doc != null) {
                        list.push(doc);
                    } else {
                        resolve(list);
                    }
                }
            });
        }.bind(this);
        return new Promise(executor);

    }
}
// Not the _id of mongo db. This is more like name for the content
MongoDataAccess.prototype._db = null;
MongoDataAccess.prototype._mongodb = null;


module.exports = MongoDataAccess;
