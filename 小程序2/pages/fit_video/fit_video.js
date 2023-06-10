// pages/fit_video/fit_video.js
let Id = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
   video:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Id = options.id
    console.log("获取的id为",Id)
    wx.cloud.database().collection("jianshen")
    .doc(Id)
    .get()
    .then(res=>{
    console.log("详情页成功",res)
    this.setData({
     video:res.data.video
    })
   })
    .catch(res=>{
     console.log("详情页失败",res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})