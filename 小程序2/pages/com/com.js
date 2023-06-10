// pages/com/com.js
let Id = ""
Page({
  data: {
    detail:"",
    pinglun:[]
  },
  onLoad(options){
    Id = options.id
    console.log("获取的id为",Id)
    wx.cloud.database().collection("dongtai")
    .doc(Id)
    .get()
    .then(res=>{
    console.log("详情页成功",res)
    this.setData({
     detail:res.data,
     pinglun : res.data.pinglun
    })
   })
    .catch(res=>{
     console.log("详情页失败",res)
    })
  },
  getcontent(event)
  {
    this.setData({
     content : event.detail.value
    })
  },
  fabiao2()
 {
   let content = this.data.content
   if(content.length<4)
   {
     wx.showToast({
       icon:"none",
       title: '评论太短了',
     })
     return 
   }
let pinglunitem = {}
pinglunitem.name = "倾一世，凉一生"
 pinglunitem.content = content
 let pinglunArr= this.data.pinglun
pinglunArr.push(pinglunitem)
 console.log("添加后的评论数组",pinglunArr)
 wx.showLoading({
   title: '发表中...',
 })
 wx.cloud.callFunction({
   name:"caozuo",
   data:{
     action:"fabiao2",
     id:Id,
     pinglun:pinglunArr
   }
 })
 .then(res=>{
 console.log("发表成功",res)
 this.setData({
 pinglun:pinglunArr,
 content:""
 })
 wx.hideLoading()
 })
 .catch(res=>{
 console.log("发表失败",res)
 wx.hideLoading()
 })
 },
})