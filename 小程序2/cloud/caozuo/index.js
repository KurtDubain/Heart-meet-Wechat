// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
if(event.action=="shoucang"){
  return await cloud.database().collection("homelist").doc(event.id)
  .update({
    data:{
     shoucang:event.shoucang
    }
  })
  .then(res=>{
   console.log("改变收藏状态成功",res)
   return res
  })
  .catch(res=>{
    console.log("改变收藏状态失败",res)
    return res 
  })
}else if(event.action=="dianzan"){
  return await cloud.database().collection("homelist").doc(event.id)
  .update({
    data:{
     dianzan:event.dianzan
    }
  })
  .then(res=>{
   console.log("改变点赞状态成功",res)
   return res
  })
  .catch(res=>{
    console.log("改变点赞状态失败",res)
    return res 
  })
}
  else if(event.action=="fabiao"){
    return await cloud.database().collection("homelist").doc(event.id)
    .update({
      data:{
       pinglun:event.pinglun
      }
    })
    .then(res=>{
     console.log("添加评论成功",res)
     return res
    })
    .catch(res=>{
      console.log("添加评论失败",res)
      return res 
    })
  }
  else if(event.action=="fabiao1"){
    return await cloud.database().collection("gym").doc(event.id)
    .update({
      data:{
       pinglun:event.pinglun
      }
    })
    .then(res=>{
     console.log("添加评论成功",res)
     return res
    })
    .catch(res=>{
      console.log("添加评论失败",res)
      return res 
    })
  }
  else if(event.action=="fabiao2"){
    return await cloud.database().collection("dongtai").doc(event.id)
    .update({
      data:{
       pinglun:event.pinglun
      }
    })
    .then(res=>{
     console.log("添加评论成功",res)
     return res
    })
    .catch(res=>{
      console.log("添加评论失败",res)
      return res 
    })
  }
}