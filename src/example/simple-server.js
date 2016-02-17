"use strict";
var express = require('express');
var ContentRepository = require('./../generic-content/repository/ContentRepository');
var ContentEntity = require('./../generic-content/entity/ContentEntity');
var ObjectDataAccess = require('./../data-access/ObjectDataAccess');

var app = express();
var objectDataAccess;
var contentRepository;
objectDataAccess = new ObjectDataAccess({})
contentRepository = new ContentRepository(objectDataAccess);

/**
 * Building dummy content
 * @param contentRepository
 */
async function buildContent(contentRepository)
{
    await contentRepository.removeAll();
    await contentRepository.add(new ContentEntity("about-page","This is example content of about page"))
}

async function handleContentRequest(req)
{
    var contentId = req.params.id;
    var contentEntity = await contentRepository.findOne(contentId);
    return contentEntity;
}

app.get('/rest/content/:id', async function(req, res)
{
    try {
        var obj = await handleContentRequest(req);
        res.json(obj);

    } catch (e) {
        console.log("error",e);
        res.json({"error":"something bad happend"});
    }
});

async function start()
{
    try {
        await buildContent(contentRepository);
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
            console.log('Navigate to http://127.0.0.1:3000/rest/content/about-page to see the result');
        });
    } catch(e) {
        console.log('error starting server: ',e);
    }

}

start();


