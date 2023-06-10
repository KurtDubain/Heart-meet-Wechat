// pages/gym/gym.js
let Id = ""
Page({
  data: {
    detail:"",
    pinglun:[]
  },
  onLoad(options){
    Id = options.id
    console.log("获取的id为",Id)
    wx.cloud.database().collection("gym")
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
   //发表评论
 fabiao1()
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
     action:"fabiao1",
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

  go1(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '/pages/gbook/gbook?id='+event.currentTarget.dataset.item._id,
    })
  },
})

