console.log('hello world');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongo = require('mongoose');
var url = "mongodb://localhost:27017/jay";

var db = mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, res) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to' + db, ' + ', res);
    }
});

var app = express()
app.use(bodyparser());
app.use(bodyparser.json({ limit: '5mb' }));
app.use(bodyparser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.setHeader('Access-control-origin', 'http://localhost:4200');
    res.setHeader('Access-control-methods', 'GET, POST, OPTIONS, PUT, PATH, DELETE');
    res.setHeader('Access-control-headers', 'x-Requested-With, content-type');
    res.setHeader('Access-control-credentials', true);
    next();
});

var Schema = mongo.Schema;

var UserSchema = new Schema({
    name: { type: String },
    age: { type: String }
}, { versionkey: false });

var model = mongo.model('users', UserSchema, 'users');

app.post('/api/save', function(req, res){

    var mod = new model(req.body);
    if(req.body.mode == 'Save')
    {
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send({ data : 'Record has been inserted'});
                console.log('record inserted');
            }
        });
    }
    else{
        model.findByIdAndUpdate(req.body.id, { name : req.body.name , age : req.body.age},function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send({ data : 'Record updated'});
            }
        });
    }
})

app.post('/api/delete', function(req, res){

    model.remove({ _id: req.body.id}, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send({ data : 'record deleted'});
        }
    });
})


app.get('/api/getuser', function(req, res){

    model.find({}, function(err, data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
            console.log('hello get user');
        }
    });
})
   
app.listen(8080, function(){
    console.log('example app listening on port 8080');
})




// var database = mongo.connection;

// console.log('database connected', database);



// var db = mongo.connect(url,{ useNewUrlParser: true }, function(err, response){

//     if(err) throw err;
// //     var dbo = db.db("sai");
// //   dbo.createCollection("customers", function(err, res) {
// //     if (err) throw err;
// //     console.log("Collection created!");
// //     db.close();
// //   });
//     else 
//       { console.log('connected to ' + db, ' + ', response);
//         }


// });


// var app = express()
// app.get('hehe', function(){

// })


// console.log('jaya mongodb is connected...')