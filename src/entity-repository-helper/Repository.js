"use strict";
var Entity = require('./Entity');

class Repository
{
    constructor(dataAccess)
    {
        this.dataAccess = dataAccess;
    }


    findOne(id)
    {
        var error = "findOne was not implemented in Repository";
        console.log(error)
        throw Error(error);
    }
    findAll()
    {
        var error = "findAll was not implemented in Repository";
        console.log(error)
        throw Error(error);
    }


    removeAll()
    {
        var error = "removeAll was not implemented in Repository";
        console.log(error)
        throw Error(error);
    }

    remove(id)
    {
        var error = "remove was not implemented in Repository";
        console.log(error)
        throw Error(error);
    }

    add(entity)
    {
        var error = "add was not implemented in Repository";
        console.log(error)
        throw Error(error);
    }
}



module.exports = Repository;
