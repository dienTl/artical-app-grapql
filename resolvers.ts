import Article from "./models/article.models"

export const resolvers = {
  Query:{
    hello : () =>{
      return "hello world"
    },
    getListArticle : async () =>{
      const articles = await Article.find({
        deleted:false
      })
      return articles
    },

    getArticle : async (_,test) =>{
      const { id} = test
      const article = await Article.findOne({
        _id: id,
        deleted:false
      })
      return article
    }
  },
  Mutation:{
    createArticle: async(_, agrs) => {
      const {article} = agrs ;

      const record = new Article(article);
      await record.save()
      return record;
    }
  }
}
