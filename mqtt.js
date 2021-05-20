var mqtt = require('mqtt')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var client  = mqtt.connect([{host:'localhost',port:'1883'}])
 
// on mqtt conect subscribe on tobic test 
client.on('connect', function () {
  client.subscribe('test', function (err) {
      if(err)
      console.log(err)
  })
})

 //when recive message 
client.on('message', function (topic, message) {
  json_check(message)
})

//check if data json or not
function json_check(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    Mongo_insert(JSON.parse(data))
}

//insert data in mongodb
function Mongo_insert(data){
MongoClient.connect(url, function(err, db ) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").insertOne(data, function(err, res) {
      if (err) throw err;
      db.close();
    });
  }); 
}