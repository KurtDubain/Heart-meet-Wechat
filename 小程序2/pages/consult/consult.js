// pages/consult/consult.js
Page({
  data: {
    currentIndex:0,
    winHeight:700,
    datalist:[],
    content:""
  },
  
  onLoad(options) {
    wx.cloud.database().collection('teacher').get()
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

  changeCurrentIndex:function(e){
    this.setData({
      currentIndex:e.currentTarget.id
    })
  },

  stopTouchMove: function() {
    return false;
  },

  go1(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '/pages/tutor/tutor?id='+event.currentTarget.dataset.item._id,
    })
   },

   go2(event){
    wx.navigateTo({
      url: '/pages/talk/talk',
    })
   },

   book(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '/pages/book/book?id='+event.currentTarget.dataset.item._id,
    })
  },

  getcontent(event)
  {
    this.setData({
     content : event.detail.value
    })
    let content = this.data.content
    console.log(content)
    wx.cloud.database().collection('teacher').where({
      name: wx.cloud.database().RegExp({
        regexp: content,
        options: 'i',
      })
    }).get()
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
})
