const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();

mongoose.connect('mongodb://localhost:27017/twitter');

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

const userSchema = new Schema({
    name: String,
    age: Number
})

const postsSchema = new Schema({
    title: String,
    desc: String,
    userId: String
})

const Post = mongoose.model('post',postsSchema)

const User = mongoose.model('user',userSchema)

app.post("/users",(req,res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age
    })

    user.save(function (err){
        if (err)
        {
            res.send(err);
        }
        res.send("data saved")
    });
})

app.get("/users",(req,res) => {
    User.find({},function (err,docs){
        if (err){
            res.send(err);
        }

        res.send(docs);
    })
})

app.get("/user/:id",(req,res) => {
    const id = req.params.id;
    User.findById(id,function (err,docs){
        if (err){
            res.send(err);
        }
        res.send(docs);
    })
})

app.put("/user/:id",(req,res) => {
    const userData = {
        name: req.body.name,
        age: req.body.age
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id,userData,function (err){
        if (err){
            res.send(err);
        }
        res.send("200 ok");
    })
})

app.delete("/user/:id",(req,res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id,function (err){
        if (err){
            res.send(err);
        }
        res.send("deleted");
    })

})

app.post("/:userId/posts",(req,res) => {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
        userId:req.params.userId
    })

    post.save(function (err){
        if (err){
            res.send(err)
        }
        res.send("post saved");
    })

})

app.get("/posts",(req,res) => {

    Post.find(function (err,docs){
        if (err){
            res.send(err);
        }
        res.send(docs);
    })
})

app.get("/:userId/posts",(req,res) => {
    const userId = req.params.userId;

    Post.find({userId:userId},function (err,docs){
        if (err){
            res.send(err);
        }
        res.send(docs);
    })
})


app.get("/posts/:id",(req,res) => {
    const id = req.params.id;

    Post.findById(id,function (err,docs){
        if (err){
            res.send(err);
        }
        res.send(docs);
    })
})

app.put("/posts/:id",(req,res) =>{
    const id = req.params.id;

    const postsData = {
        title: req.body.title,
        desc: req.body.desc
    }

    Post.findByIdAndUpdate(id,postsData,function (err){
        if (err){
            res.send(err);
        }
        res.send("updated");
    })
})

app.delete("/post/:id",(req,res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id,function (err){
        if (err){
            res.send(err)
        }
        res.send("deleted")
    })
})










app.listen(3000);
