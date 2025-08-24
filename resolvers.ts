import Article from "./models/article.models"
import Category from "./models/category.model"

export const resolvers = {
  Query:{
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
    },


    getListCategory : async () =>{
      const category =await Category.find({
        deleted :false
      })
      return category
    },

    getCategory : async(_,agrs) =>{
      const {id} = agrs 
      const category = await Category.findOne({
        _id: id,
        deleted:false 
      })
      return category
    }
  },
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

  createCategory: async (_, args) => {
  const { category } = args;
  const record = new Category(category);
  await record.save();
  return record;
},
    updateCategory : async(_,agrs) =>{
      const{id,category} =agrs 
      await Category.updateOne({
        _id:id,
        deleted:false
      },category);

      const record = await Category.findOne({
        _id: id
      })
      return record
    },
    deleteCategory : async(_, agrs) =>{
      const {id} = agrs 
      await Category.updateOne({
        _id:id
      },{
        deleted:true,
        deletedAt: new Date()
      })
      return "Đã xóa"
    }
  }

  
}
