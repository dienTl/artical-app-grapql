import { message } from "antd";
import {generateRandomString} from "../helper/generate"
import User from "../models/user.model";
import md5 from "md5"

export const resolversUser ={
  Query :{
    getUser: async (_,agrs) =>{
      const {id} = agrs;
      const infouser = await User.findOne({
        _id:id ,
        deleted:false 
      })
      if(infouser){
        return{
          code:200,
          message:"Thành công",
          id: infouser.id,
          fullName: infouser.fullName,
          email: infouser.email,
          token:infouser.token
        };
      }else{
        return{
          code:400,
          message:"thất bại"
        }
      }
    }
  },
  Mutation:{
    registerUser: async(_,args) =>{
      const {user} = args ;
      const emailExist = await User.findOne({
        email: user.email,
        deleted:false
      })
      if(emailExist){
        return{
          code:400,
          message:"email đã tồn tại"
        }
      } else {
        user.password = md5(user.password);
        user.token = generateRandomString(30)
        const newUser = new User(user)
        const data = await newUser.save()

        return {
          code: 200 ,
          message:" thành công",
          id: data.id,
          fullName: data.fullName,
          email: data.email ,
          token: data.token
        }
      }
    } ,
    loginUser : async(_, args) =>{
      const{email,password} = args.user ;
      const infouser= await User.findOne({
        email:email,
        deleted:false,
      })
      if(!infouser){
        return{
          code: 400,
          message:"Email không tồn tại"
        }
      }
      if(md5(password) !== infouser.password){
          return{
        code: 400 ,
        message:"sai mật khẩu"
        }
      }
      return{
        code: 200 ,
        message:"thành công",
        id: infouser.id,
        fullName: infouser.email,
        email:infouser.email,
        token: infouser.token
      }

    }
  }
}