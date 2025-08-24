import Article from "./models/article.models"

export const resolvers = {
  Query:{
    hello : () =>{
      return "hello world"
    },
    getListArticle : async () =>{
      const article = await Article.find({
        deleted:false
      })
      return article
    }
  }
}
