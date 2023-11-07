// index.js

const fs = require('fs');
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }))
const activities = require('./activities.json')


app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/autumn", function(request, response) {
    fs.writeFile(__dirname+"/data.txt", request.body.activity, function() {
        response.send("投稿されました。");
    });
});

app.post("/update", function(request, response) {
    activities[0].activity = request.body.updatedActivity;
    response.send(activities);
});

app.post("/delete", function(request, response) {
    activities.splice(request.body.number, 1);
    response.send(activities);
});

const port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log(`Listening on localhost port ${port}`);
});
