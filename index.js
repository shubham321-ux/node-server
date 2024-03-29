require('dotenv').config();
const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const PORT = process.env.PORT || 8080;

const app=express()
app.use(cors())
app.use(express.json())


const main=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB connected")
};
main()
const userSchema = mongoose.Schema({
    Gmail:String,
    Name:String,
    Subject:String,
    Phone:Number,
    Massage:String
});

const model=mongoose.model('PortfolioData',userSchema);



app.use(bodyParser.json());

app.get('/demo',(req,res)=>{
    res.send("welcome")
});
app.post('/',async(req,res)=>{
    console.log("")
    let resdata= model()
    resdata.Gmail=req.body.email
    resdata.Name=req.body.name
    resdata.Subject=req.body.subject
    resdata.Phone=req.body.phone.phone
    resdata.Massage=req.body.Massage
      const doc= await resdata.save()
      console.log("this is DB data",doc)

    console.log(req.body)
    res.send(req.body)
});
app.get('/geted',async(req,res)=>{
  const dataload=await model.findOne({Name:"SHUBHAM"})
  res.send(dataload)
  console.log(dataload)
});
app.listen(PORT,()=>{
    console.log("server started on " ,PORT)
});