const express=require('express')
const cors = require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const main=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp')
    console.log("DB connected")
}
main()
const userSchema = mongoose.Schema({
    Gmail:String,
    Name:String,
    Subject:String,
    Phone:Number,
    Massage:String
})

const model=mongoose.model('userdata',userSchema)

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("welcome")
})
app.post('/demo',async(req,res)=>{
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
})
app.get('/geted',async(req,res)=>{
  const dataload=await model.findOne({Name:"SHUBHAM"})
  res.send(dataload)
  console.log(dataload)
})
app.listen(3002,()=>{
    console.log("server started")
})