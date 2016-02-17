"use strict";



class DataAccess
{
    find(collectionName,filterObj)
    {
        throw new Error("DataAccess find not implemented");
    }

    insert(collectionName,filterObj)
    {
        throw new Error("DataAccess insert not implemented");
    }
    remove(collectionName,filterObj)
    {
        throw new Error("DataAccess remove not implemented");
    }
}
// Not the _id of mongo db. This is more like name for the content
DataAccess.prototype.id = null;


module.exports = DataAccess;
