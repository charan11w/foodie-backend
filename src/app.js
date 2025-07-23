const express=require("express")
const app=express();
const connectdb=require("./config/database")
const dotenv=require("dotenv");
const cookieParser = require("cookie-parser");
const authRouter=require("./routes/auth")

dotenv.config({ quiet: true });


app.use(express.json())
app.use(cookieParser())
app.use("/",authRouter)

connectdb()
.then(()=>{
  console.log("conection to db is successful");
  app.listen(process.env.PORT,()=>{
    console.log("port listening on 6666")
  })
})
.catch((err)=> console.log("something went wrong",err.message))