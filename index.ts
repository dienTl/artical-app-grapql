import express ,{Express ,Request , Response} from "express"
import * as database from "./config/database"
import dotenv from "dotenv"
import Article from "./models/article.models";

dotenv.config()
database.connect();



const app :Express = express();
const port : number| string = process.env.PORT || 3000 ;

// Rest api 
app.get("/articles" ,async (req:Request ,res:Response)=>{
  const articls = await Article.find({
    deleted:false
  })
  res.json({
    articles : articls
  })
})
app.listen(port,()=>{
  console.log(`App listening on port ${port}`)
})