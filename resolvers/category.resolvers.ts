import Category from "../models/category.model"

export const resolversCategory = {
  Query:{
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
