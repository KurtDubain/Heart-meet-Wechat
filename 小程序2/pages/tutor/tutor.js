// pages/tutor/tutor.js
let Id = ""
Page({
  data: {
    detail:"",
  },
  onLoad(options){
    Id = options.id
    console.log("获取的id为",Id)
    wx.cloud.database().collection("teacher")
    .doc(Id)
    .get()
    .then(res=>{
    console.log("详情页成功",res)
    this.setData({
     detail:res.data,
    })
   })
    .catch(res=>{
     console.log("详情页失败",res)
    })
  }
})