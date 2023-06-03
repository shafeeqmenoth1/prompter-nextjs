import mongoose from "mongoose"



let isConnected = false

export const connectToDB = async()=>{
    mongoose.set('strictQuery',true)
     if(isConnected){
        console.log("MongoDb is already Connected");
        return
     }
     try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"prompter",
            useNewUrlParser : true,
            useUnifiedTopology:true
        })
        isConnected =true
        console.log("MongoDB Connected");
     } catch (error) {
        console.log(error);
     }
}