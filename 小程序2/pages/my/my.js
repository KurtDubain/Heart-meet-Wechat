// pages/my/my.js
const DB = wx.cloud.database()
Page({
  data: {
    userInfo: ''
  },
  login(){
    wx.getUserProfile({
      desc:'必须授权',
      success:res=>{
        let user=res.userInfo
        wx.setStorageSync('user', user)
        console.log("用户信息", user)
        this.setData({
          userInfo:user
        })
        wx.cloud.callFunction({
          name:"getopenid",
          success(res)
            {
               console.log("获取openid成功",res.result.openid)
               let openId= res.result.openid
               DB.collection("user").where({
                _openid:openId
              }).get().then(res=>{
                console.log(res.nickName)
                let a = res.data.length
                 if(a==0){
                   console.log("www")
                   DB.collection("user").add({
                    data:{    
                      nickName:user.nickName,
                      avatarUrl:user.avatarUrl
                    }
                  })
                }
              })
            },
        })
    },
      fail:res=>{
        console.log('授权失败',res)
      }
    })
  },
  loginOut(){
    this.setData({
      userInfo:''
    })
    wx.setStorageSync('user', null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let user=wx.getStorageSync('user')
    this.setData({
      userInfo: user
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

  go1(){
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },

  go3(){
    wx.navigateTo({
      url: '/pages/us/us',
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
