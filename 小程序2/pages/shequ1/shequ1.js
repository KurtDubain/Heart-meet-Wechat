// pages/shequ1/shequ1.js
Page({
  data: {
   imageUrl:"",
   videoUrl:"cloud://cloud1-3gcu92iq35140809.636c-cloud1-3gcu92iq35140809-1311565398/1651235760817.mp4"
  },
  //下载并打开excel文件
  openExcel()
  {
    wx.cloud.downloadFile({
      fileID:'cloud://cloud1-3gcu92iq35140809.636c-cloud1-3gcu92iq35140809-1311565398/编程.xlsx',
      success: res=> {
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  //上传excel文件
  uploadExcel()
  {
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        console.log("选择excel成功",res)
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: '编程.xlsx',
          // 指定要上传的文件的小程序临时文件路径
          filePath:  res.tempFiles[0].path,
          // 成功回调
          success: res => {
            console.log('上传excel成功', res)
          },
        })
      }
    })
  },
 //上传图片
  upload()
  {
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime()+'.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            this.setData({
              imageUrl:res.fileID
            })
          },
        })
      },
    })
  },
  //上传视频
  uploadVideo()
  {
    wx.chooseMedia({
      sourceType: ['album', 'camera'],
      maxDuration: 600,
      camera: 'back',
      success(res) {
        console.log("上传视频成功",res.tempFiles[0].tempFilePath)
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime()+'.mp4',
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFiles[0].tempFilePath,
          // 成功回调
          success: res => {
            console.log('上传成功', res)
          },
        })
      }
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