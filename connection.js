import mongoose from "mongoose";

export default function connectMongoDb(url){
   mongoose.connect(url)
   .then(()=>{console.log("MongoDB connected")
    console.log(mongoose.connection.readyState);
} )
.catch((err)=> console.log("Mongo Err:",err))
}