"use strict";
var DataAccess = require('./DataAccess');

class ObjectDataAccess extends DataAccess
{
    constructor(db)
    {
        super();
        this._db = db;
    }

    insert(collectionName,obj)
    {
        if(this._db[collectionName]===undefined) {
            this._db[collectionName] = {};
        }
        this._db[collectionName]["id_"+this.createInternalId()] = obj;
        return obj;

    }

    // private
    checkFilter(collectionObj,filterObj)
    {
        for(var fieldKey in filterObj) {
            if(collectionObj[fieldKey]!==filterObj[fieldKey]) {
                return false;
            }
        }
        return true;
    }

    // Private
    // Notice that between two lines of code timestamp may be the same so must add random
    createInternalId()
    {
        return new Date().getTime()+"_"+Math.random();
    }

    remove(collectionName,filterObj)
    {
        var internalIdsListToRemove = [];
        for(var internalId in  this._db[collectionName]) {
            if(this.checkFilter(this._db[collectionName][internalId],filterObj)) {
                internalIdsListToRemove.push(internalId);
            }
        }

        for(var i=0;i<internalIdsListToRemove.length;i++) {
            delete this._db[collectionName][internalIdsListToRemove[i]];
        }
        return {result:internalIdsListToRemove};
    }

    find(collectionName,filterObj)
    {
        if(this._db[collectionName]===undefined) {
            return [];
        }
        var objList = [];
        for(var internalId in  this._db[collectionName]) {

            if(filterObj===undefined) {
                objList.push(this._db[collectionName][internalId]);
            }
            else if(this.checkFilter(this._db[collectionName][internalId],filterObj)) {

                objList.push(this._db[collectionName][internalId]);
            }
        }
        return objList;
    }
}
// Not the _id of mongo db. This is more like name for the content
ObjectDataAccess.prototype._db = null;


module.exports = ObjectDataAccess;
