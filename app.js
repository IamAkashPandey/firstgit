const express =require("express");
//const { fstat } = require("fs");
const app=express();
const port=80;
const path=require("path");
const fs=require("fs");
var mongoose=require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/akashdb',{useNewUrlParser:true,useUnifiedTopology:true});

var formschema= new mongoose.Schema({
    Name:String,
    Mobileno:String,
    Email:String,
    address:String

});
var formmodel= new mongoose.model('form',formschema);

//app.use('/static',express.static('static'));
app.use(express.urlencoded({extended:true}))
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.get("/demo",(req,res)=>{
    const title={'Aman':'Akash Pandey 1'};
    //const con="Aman is a good boy";

    res.status(200).render('pug1.pug',title)});
//app.post("/demo",(req,res)=>{
  //  Name=req.body.Name
    //Mobile=req.body.Mobileno
    //Email=req.body.Email
    //Address=req.body.address
    //let text=`name is ${Name},mobile is ${Mobile},email is ${Email},addres is ${Address}`;
    //fs.writeFileSync("Akash.txt",text);   
    //console.log(formdetails);
    //const title={'Aman':'Form has been submitted successfully'};
    //res.status(200).render('pug1.pug')
//});
app.post("/demo",(req,res)=>{
    var myform= new formmodel(req.body);
    myform.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });

})
app.get(("/home"),(req,res)=>{
    res.send("This is home");
});
app.post(("/about"),(req,res)=>{
    res.send("Hello Beta!")
});
app.listen(port,()=>{
    console.log(`Localhost100:${port}`);
});