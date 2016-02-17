"use strict";
var Repository = require('./../../entity-repository-helper/Repository');
var Entity = require('./../../entity-repository-helper/Entity');

var ContentEntity = require('./../entity/ContentEntity');
var DataAccess = require('./../../data-access/DataAccess');

class ContentRepository extends Repository
{

    constructor(dataAccess)
    {
        super();
        this.dataAccess = dataAccess;
    }


    async findOne(id)
    {
        var objList = await this.dataAccess.find('content',{'id': id});
        if(objList[0]!== undefined) {
            return objList[0];
        } else {
            return null;
        }
    }

    async findAll()
    {
        var objList = await this.dataAccess.find('content');

        var list = [];
        objList.map(function(obj)
        {
            var contentEntity = new ContentEntity(obj.id,obj.data);
            list.push(contentEntity);
        })
        return list;
    }


    async removeAll()
    {
        var entitiesList = await this.findAll();
        var removePromises = [];
        entitiesList.map(function(contentEntity)
        {
            var id = contentEntity.id;
            removePromises.push(this.remove(id));
        }.bind(this))
        var removeResults = await Promise.all(removePromises);
        return removeResults;
    }

    async remove(id)
    {
        var daResult = await this.dataAccess.remove('content',{'id': id});
        return daResult.result;
    }

    async add(contentEntity)
    {
        // @TODO think how to improve performance by not doing the first check if entity exists

        var foundContentEntity = await this.findOne(contentEntity.id);
        if(foundContentEntity!==null) {
            try {
                var text = JSON.stringify(foundContentEntity);
            }
            catch(e) {
                reject("Error using JSON");
            }
            throw Error("Entity with id: " + contentEntity.id +' already exists: '+text);
        }

        return await this.dataAccess.insert('content',contentEntity);
    }
}

ContentRepository.prototype.dataAccess = null;


module.exports = ContentRepository;
