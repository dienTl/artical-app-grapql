import Article from "../models/article.models"
import Category from "../models/category.model"

export const resolversArticle = {
  Query:{
    getListArticle : async (_,agrs) =>{
      const {sortKey , sortValue , currentPage , limitItems} = agrs

      // sort
      const sort ={}

      if(sortKey && sortValue){
        sort[sortKey] = sortValue 
      }
      //end sort

      //pagination
      const skip = (currentPage -1) * limitItems
      //end pagination
      const articles = await Article.find({
        deleted:false
      }).sort(sort).limit(limitItems).skip(skip)

      return articles
    },

    getArticle : async (_,test) =>{
      const { id} = test
      const article = await Article.findOne({
        _id: id,
        deleted:false
      })
      return article
    },
  },
  Article:{
    category: async (article) =>{
      const categoryId = article.Category;

      const category = await Category.findOne({
        _id:categoryId ,
      })
      return category
    }
  }
  ,
  Mutation:{
    createArticle: async(_, agrs) => {
      const {article} = agrs ;

      const record = new Article(article);
      await record.save()
      return record;
    },
    deleteArticle: async(_,agrs) =>{
      const {id} =agrs
      
      await Article.updateOne({
        _id: id
      },{
        deleted:true,
        deletedAt:new Date()
      })

      return "Đã xóa"
    },
    updateArticle : async(_,agrs) =>{
      const{id, article} =agrs 
      await Article.updateOne({
        _id:id,
        deleted:false
      },article);

      const record = await Article.findOne({
        _id: id
      })
      return record
    },
  }
}
