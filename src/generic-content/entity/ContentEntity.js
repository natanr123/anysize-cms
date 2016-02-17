"use strict";
var Entity = require('./../../entity-repository-helper/Entity');



class ContentEntity extends Entity
{
    constructor(id,data)
    {
        super(id);
        this.data = data;
    }
}

ContentEntity.prototype.data = null;
module.exports = ContentEntity;
