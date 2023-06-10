// pages/home/home.js
Page({
  data: {
   datalist:[]
  },

  go1(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '/pages/fit_video/fit_video?id='+event.currentTarget.dataset.item._id,
    })
  },
  onLoad(options) {
    wx.cloud.database().collection('jianshen').get()
    .then(res=>{
      console.log("获取成功",res)
      this.setData({
        datalist:res.data
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    })
  }
})