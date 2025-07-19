const express=require("express")
const app=express();
const connectdb=require("./config/database")



connectdb()
.then(()=>{
  console.log("conection to db is successful");
  app.listen(6666,()=>{
    console.log("port listening on 6666")
  })
})
.catch(()=> console.log("something went wrong"))