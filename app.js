const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
//const MealPlan = require('.models/tmealPlan');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//mongoose 
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/dietDB', { useNewUrlParser: true, useUnifiedTopology: true });
const mealPlanSchema = new mongoose.Schema({
    earlyMorning:{
        type:String
    },
     breakfast:{
        type:String
    },
    midMorning:{
        type:String
     },
     lunch:{
        type:String
     },
     afternoonSnack:{
        type:String
     },
     eveningSnack:{
        type:String
     },
     dinner:{
         type:String
    }
  });
  
  const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
  //module.exports = MealPlan;




const home = "Wanna be HEALTHY!! Here we are helping you with your meal discipline. Let's take one step at a time and prepare a plan first, accomodating your needs.Start your journey of a healthier lifestyle.";
const charts= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec quam ac velit tincidunt imperdiet. Donec aliquam felis ut risus varius, congue mattis nulla porta. Vivamus efficitur odio sit amet facilisis pellentesque. Duis facilisis elit eros. Vivamus eu bibendum mauris. Curabitur faucibus rhoncus sem at bibendum. Vivamus id ipsum fermentum, varius diam nec, sollicitudin sapien. Pellentesque hendrerit ligula ipsum, vitae iaculis nisl varius eu. Pellentesque justo est, cursus ac varius nec, rhoncus vitae mauris. In a nunc dapibus, porta eros et, fermentum risus. Proin turpis sapien, condimentum ut scelerisque quis, sagittis dapibus erat. Vivamus vitae velit id dui suscipit semper nec scelerisque ex. Sed quis dictum leo. Donec varius nulla arcu, sit amet aliquet velit cursus et.";
const reviews = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec quam ac velit tincidunt imperdiet. Donec aliquam felis ut risus varius, congue mattis nulla porta. Vivamus efficitur odio sit amet facilisis pellentesque. Duis facilisis elit eros. Vivamus eu bibendum mauris. Curabitur faucibus rhoncus sem at bibendum. Vivamus id ipsum fermentum, varius diam nec, sollicitudin sapien. Pellentesque hendrerit ligula ipsum, vitae iaculis nisl varius eu. Pellentesque justo est, cursus ac varius nec, rhoncus vitae mauris. In a nunc dapibus, porta eros et, fermentum risus. Proin turpis sapien, condimentum ut scelerisque quis, sagittis dapibus erat. Vivamus vitae velit id dui suscipit semper nec scelerisque ex. Sed quis dictum leo. Donec varius nulla arcu, sit amet aliquet velit cursus et.";

app.get("/", function(req,res){
    res.render("home",({homeContent: home}));
})
app.get("/home", function(req,res){
    res.render("home",({homeContent: home}));
})
app.get("/charts", function(req,res){
    res.render("charts",({chartsContent: charts}));
});

app.get('/mealplans', function (req, res){
    res.render("mealplans");
});

app.post("/mealplans", async (req,res) => {
    try{
        const mealPlanner = new MealPlan (req.body);
        console.log(JSON.stringify(mealPlanner));
        console.log("hello");
        await mealPlanner.save();        
        res.redirect('/mealplans');
    } catch (err) {
        console.log(err);
        res.redirect("/mealplans");
    }
//res.redirect('/charts');
});


app.get("/reviews", function(req,res){
    res.render("reviews",({reviewsContent: reviews}));
})

app.listen(3000, function(err){
    if(err){
        console.log("There is a server related error.");
    } else {
        console.log("Server started at port 3000.")
    }
})