// pages/record/record.js
Page({
  data: {
    select1: false,
    select2: false,
    datalist1:[],
    datalist2:[]
  },

  onLoad(options) {
    wx.cloud.database().collection('record').get()
    .then(res=>{
      console.log("获取成功",res)
      this.setData({
        datalist1:res.data
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    })
    wx.cloud.database().collection('recordg').get()
    .then(res=>{
      console.log("获取成功",res)
      this.setData({
        datalist2:res.data
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    })
  },

  delete1(event) {
     var id = event.currentTarget.dataset.id;
     console.log(id)
    wx.cloud.database().collection('record').where({
      _id:id
    }).remove({
      success: function () {
        that.setData({
          isCollect: 0
        })
      },
    })
    wx.showToast({
      title: '取消成功',
      duration: 2000
    })
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()  
  },

  delete2(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
   wx.cloud.database().collection('recordg').where({
     _id:id
   }).remove({
     success: function () {
       that.setData({
         isCollect: 0
       })
     },
   })
   wx.showToast({
     title: '取消成功',
     duration: 2000
   })
   const pages = getCurrentPages()
   const perpage = pages[pages.length - 1]
   perpage.onLoad()  
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
})