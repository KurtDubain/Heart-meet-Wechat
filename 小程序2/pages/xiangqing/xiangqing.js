// pages/xiangqing/xiangqing.js
let shoucang = false
let dianzan = false
let Id = ""
const DB = wx.cloud.database()
Page({
  data:{
   detail:"",
   imgUrl:"../../images/shucang-no.png",
   imgUrl1:"../../images/dianzan-no.png",
   pinglun:[],//评论数组
   content:"",
   userInfo: ''
  },
  
 onLoad(options){
   Id = options.id
   console.log("获取的id为",Id)
   wx.cloud.database().collection("homelist")
   .doc(Id)
   .get()
   .then(res=>{
   console.log("详情页成功",res)
   shoucang = res.data.shoucang
   dianzan = res.data.dianzan
   this.setData({
    detail:res.data,
    imgUrl:shoucang?"../../images/shucang-yes.png":"../../images/shucang-no.png",
    imgUrl1:dianzan?"../../images/dianzan-yes.png":"../../images/dianzan-no.png",
    pinglun : res.data.pinglun
   })
  })
   .catch(res=>{
    console.log("详情页失败",res)
   })
 },
 //收藏点击
 clickme()
 {
   this.setData({
     imgUrl:shoucang?"../../images/shucang-no.png":"../../images/shucang-yes.png"
   })
   shoucang = !shoucang  
   wx.cloud.callFunction({
     name:"caozuo",
     data:{
       action:"shoucang",
       id:Id,
       shoucang :shoucang
     }
   })
   .then(res=>{
    console.log("改变收藏状态成功",res)
   })
   .catch(res=>{
     console.log("改变收藏状态失败",res)
   })
 },
 //点赞点击
 clickme1()
 {
   this.setData({
     imgUrl1:dianzan?"../../images/dianzan-no.png":"../../images/dianzan-yes.png"
   })
   dianzan = !dianzan
   wx.cloud.callFunction({
    name:"caozuo",//云函数的名字
    data:{
      action:"dianzan",
      id:Id,
      dianzan:dianzan
    }
  })
  .then(res=>{
   console.log("改变点赞状态成功",res)
  })
  .catch(res=>{
    console.log("改变点赞状态失败",res)
  })
 },
 //获取用户输入的评论内容
 getcontent(event)
 {
   this.setData({
    content : event.detail.value
   })
 },
 //发表评论
 fabiao()
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
     action:"fabiao",
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