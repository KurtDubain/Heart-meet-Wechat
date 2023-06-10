// pages/radio/radio.js
Page({
  data: {
    isRunning:false,
    datalist:[],
      fengmian:"cloud://cloud1-3gcu92iq35140809.636c-cloud1-3gcu92iq35140809-1311565398/music1.png",
      name:"Stop crying your heart out",
    ctx:null
  },
  onLoad(options) {
    wx.cloud.database().collection('music').get()
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
  onReady:function() {
    this.ctx = wx.createInnerAudioContext();
    this.ctx.src =  "cloud://cloud1-3gcu92iq35140809.636c-cloud1-3gcu92iq35140809-1311565398/歌曲目录/1stop crying your heart out.mp3";
    this.ctx.onEnded(()=>{
      console.log("播放结束");
      this.setData({
        isRunning:false
      })
    })
  },
  start:function(){
    this.ctx.play();
    this.setData({
      isRunning:true
    })
  },
  pause:function(){
    this.ctx.pause();
    this.setData({
      isRunning:false
    })
  },
  bofang(event)
  {
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.cloud.database().collection("music")
    .doc(event.currentTarget.dataset.item._id)
    .get()
    .then(res=>{
    this.setData({
     fengmian:res.data.fengmian,
     name : res.data.name,
     ctx:res.data.music
    })
   })
    .catch(res=>{
     console.log("失败",res)
    })
  }
})