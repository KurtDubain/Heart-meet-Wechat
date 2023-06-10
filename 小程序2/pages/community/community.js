// pages/community/community.js
const Audio = wx.createInnerAudioContext()
Page({
  data: {
    datalist:[],
    currentIndex:0,
    winHeight:2200,
    src:'',
    tempFilePaths: ''
  },
  changeCurrentIndex:function(e){
    this.setData({
      currentIndex:e.currentTarget.id
    })
  },

  stopTouchMove: function() {
    return false;
  },

  go(){
    wx.navigateTo({
      url: '/pages/radio/radio',
    })
  },
  go3(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '/pages/com/com?id='+event.currentTarget.dataset.item._id,
    })
    
   },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: '/pages/com/com',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  dian(){
    wx.showActionSheet({
    itemList: ['隐藏此条动态', '举报'],
    success: function (res) {
      if (!res.cancel) {
        console.log(res.tapIndex)
      }
    }
  })
  },
  fasong(){
    var that = this;
    wx.showActionSheet({
    itemList: ['拍摄', '从相机选择'],
    success: function (res) {
      if(res.tapIndex === 0){
        
      }else if(res.tapIndex === 1){
        wx.navigateTo({
          url: '/pages/moments/moments',
        })
      }
    }
  })
  },
  onLoad(options) {
    wx.cloud.database().collection('dongtai').get()
    .then(res=>{
      console.log("获取成功",res)
      this.setData({
        datalist:res.data
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    })
  },
  chooseWxImage: function (type) {
    var that = this;
     wx.chooseImage({
       sizeType: ['original', 'compressed'],
       sourceType: [type],
       success: function (res) {
         console.log(res);
         that.setData({
           tempFilePaths: res.tempFilePaths[0],
         })
       }
     })
   }
})

