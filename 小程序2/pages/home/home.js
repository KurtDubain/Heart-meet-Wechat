//let totalNum = -1
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
  onLoad(options) {
    wx.cloud.database().collection("123").count()
    .then(res=>{
      console.log("数据总条数",res)
      totalNum = res.total
    })
    this.getDataList()
  },
*/
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  tiaozhuan()
  {
    wx.redirectTo({
      url: '/pages/exercise/exercise?user_id=111'
    })
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
//加载数据
  /**
  getDataList()
  {
    let len = this.data.list.length
    if(totalNum == len){ 
      wx.showToast({
        title: '数据已加载完',
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log("123的长度",len)
    wx.cloud.database().collection('123')
    .skip(len)
    .get()
    .then(res=>{
      console.log("获取成功",res.data)
      this.setData({
        list:this.data.list.concat(res.data)
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
      wx.showToast({
        title: '加载失败',
      })
    })
  },
  */
  /**
   * 页面上拉触底事件的处理函数


  onReachBottom() {
    console.log("加载更多。。。。。")
    this.getDataList()
  },
   */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})