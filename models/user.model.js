import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/project2").then(()=>{
    console.log("db connected");
})

let schema= new mongoose.Schema({
    name:String,
    email:String,
    image:String
})

let usermodel=mongoose.model("userproject",schema)
export default usermodel