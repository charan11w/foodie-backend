const mongoose=require("mongoose")

const connectdb=async()=>{
  await mongoose.connect("mongodb+srv://charan11w:ozvQLEkhobgz1gYd@cluster0.b9mofat.mongodb.net/")
}

module.exports=connectdb;