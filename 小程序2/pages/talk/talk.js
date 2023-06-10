// pages/talk/talk.js
let user=""
let openid=""
const DB = wx.cloud.database()
Page({
  data: {
    talk:[],
    content:"",
    respone:""
  },

  onLoad(options) {
    user=wx.getStorageSync('user')
    console.log(user)
    this.setData({
      user: user
     })
    wx.cloud.callFunction({
      name:"getopenid",
      success(res)
      {
        openid=res.result.openid
        console.log("获取的id为",openid)
        wx.cloud.database().collection("talk")
        .doc(res.result.openid)
        .get()
        .then(res=>{
        this.setData({
        talk : res.data.talk
        })
      })
      }
    })
  },

  getcontent(event)
  {
    this.setData({
     content : event.detail.value
    })
  },

  talk(){
    let content = this.data.content
    let respone = this.data.respone
    if(content.length<10)
   {
    respone="请告诉我你的情绪、想法和躯体症状，并分为轻度、中度、重度三个等级。\neg:\n急躁:中度\n忧郁:重度\n难过:中度\n思维混乱:轻度\n无法思考:中度\n过分警惕:重度\n心跳较快:轻度\n坐立不安:重度\n寝食难安:重度"
   }else{
    respone="诊断结果为: 中度焦虑症\n中度及以上患者应及时就医\n建议您在专业医师的指导下进行医治，积极配合治疗。"
   }
    let talkitem = {}
    talkitem.name = user.nickName
    talkitem.content = content.replace(" ","\n")
    talkitem.respone = respone
    let talkArr= this.data.talk
    talkArr.push(talkitem)
    this.setData({
      content : content,
      respone : respone
     })
    console.log(content,respone)
    wx.cloud.callFunction({
      name:"caozuo",
      data:{
        action:"talk",
        id:openid,
        talk:talkArr
      }
    })
    .then(res=>{
      this.setData({
        talk: talkArr,
        content:"",
        respone:""
      })
      wx.hideLoading()
      })
    .catch(res=>{
        console.log("发表失败",res)
        wx.hideLoading()
    })
  },
})