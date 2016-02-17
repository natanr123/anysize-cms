"use strict";



class Entity
{
    constructor(id,data)
    {
        // Not the _id of mongo db. This is more like name for the content
        this.id = id;
    }
}
// Not the _id of mongo db. This is more like name for the content
Entity.prototype.id = null;


module.exports = Entity;
