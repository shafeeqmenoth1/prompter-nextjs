
import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"


export const GET = async(req,{params})=>{
    try {
        console.log(params,"Paraams");
        await connectToDB()
        const prompts = await Prompt.find({creator:params.id}).populate("creator")
    
        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all Prompts",{status:500})
    }
}