const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config();

console.log(process.env.MONGO_URL)
const connectdb=async()=>{
  await mongoose.connect(process.env.MONGO_URL)
}

module.exports=connectdb;