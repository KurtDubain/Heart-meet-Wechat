// pages/gbook/gbook.js
let Id = ""
let gym = ""
const DB = wx.cloud.database()
Page({
  data: {
    select1: false,
    select2: false,
    select3: false,
    select4: false,
    select5: false,
    select6: false,
    select7: false,
    detail:"",
    userInfo:"",
    time:""
  },

  onLoad(options){
    let user=wx.getStorageSync('user')
    Id = options.id
    console.log("获取的id为",Id)
    wx.cloud.database().collection("gym")
    .doc(Id)
    .get()
    .then(res=>{
    console.log("详情页成功",res)
    gym=res.data.name
    this.setData({
     detail:res.data,
     userInfo: user
    })
   })
    .catch(res=>{
     console.log("详情页失败",res)
    })
  },

  bindShowMsg1() {
    this.setData({
      select1: !this.data.select1
    })
  },

  bindShowMsg2() {
    this.setData({
      select2: !this.data.select2
    })
  },

  bindShowMsg3() {
    this.setData({
      select3: !this.data.select3
    })
  },

  bindShowMsg4() {
    this.setData({
      select4: !this.data.select4
    })
  },

  bindShowMsg5() {
    this.setData({
      select5: !this.data.select5
    })
  },

  bindShowMsg6() {
    this.setData({
      select6: !this.data.select6
    })
  },

  bindShowMsg7() {
    this.setData({
      select7: !this.data.select7
    })
  },
  
  mySelect(e) {
    console.log(e)
    this.setData({
      time:e.target.dataset.name  
    })
    console.log(this.data.time)
    let time=this.data.time
    console.log(gym)
    wx.cloud.callFunction({
      name:"getopenid",
      success(res)
        {
           console.log("获取openid成功",res.result.openid)
           let openId= res.result.openid
           DB.collection("recordg").where({
            _openid:openId
          }).get().then(res=>{
               DB.collection("recordg").add({
                data:{   
                  gym: gym,
                  time: time,
                }
              })
          })
        },
    })
    wx.showToast({
      title: '成功',
      duration: 2000
    })
  },
})