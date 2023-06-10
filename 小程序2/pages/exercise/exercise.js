// pages/exercise/exercise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    winHeight:1050,
    gym:[ "../../images/健身房1.jpeg",
          "../../images/健身房2.jpeg",
          "../../images/健身房3.jpeg"
    ],
    datalist:[],
    gymlist:[],
    starYesNum:3,
    starNoNum:2,  
    markers: [
      {
      id: 4,
      latitude: 31.938841,
      longitude: 118.799698,
      width: 30,
      height: 30
      }
    ],
    latitude:'',
    longitude: '',
  },
  changeCurrentIndex:function(e){
    this.setData({
      currentIndex:e.currentTarget.id
    })
  },
  onLoad(options) {
    wx.cloud.database().collection('homelist').get()
    .then(res=>{
      console.log("获取成功",res)
      this.setData({
        datalist:res.data
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    }),
    wx.cloud.database().collection('gym').get()
    .then(res=>{
      console.log("获取成功",res.data.length)
      this.setData({
        gymlist:res.data,
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    })
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        this.setData({
        latitude: res.latitude,
        longitude: res.longitude
        })
      }
    })
  },
selectStar:function(e){
    console.log(e.target.id);
    console.log(e.currentTarget.dataset.in);
    if(e.currentTarget.dataset.in == 'selectStarNo'){
      this.setData({
        starYesNum: Number(e.target.id) + Number(this.data.starYesNum), 
        starNoNum:5-Number(e.target.id) - Number(this.data.starYesNum)
      })
    }else{
      this.setData({
        starYesNum:Number(e.target.id ),
        starNoNum:Number(5-e.target.id)
      })
    }
  },
  stopTouchMove: function() {
    return false;
  },
  navigate() {
    ////使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
    latitude: this.data.markers[0].latitude,//要去的纬度-地址
    longitude: this.data.markers[0].longitude,//要去的经度-地址
    })
    },
  juli()
  {
    wx.showLoading({
      title: '加载中...',
    })
   wx.cloud.database().collection('gym')
  .orderBy('price','asc')
  .get()
    .then(res=>{
      console.log('升序成功',res.data)
      this.setData({
        gymlist:res.data
      })
      wx.hideLoading()
    })
    .catch(err=>{
      console.log('升序失败')
      wx.hideLoading()
    })
  },
  jiage(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection('gym')
  .orderBy('price','desc')
  .get()
    .then(res=>{
      console.log('升序成功',res.data)
      this.setData({
        gymlist:res.data
      })
      wx.hideLoading()
    })
    .catch(err=>{
      console.log('升序失败')
      wx.hideLoading()
    })
  },
  gogym(event)
  {
   console.log("点击获取的数据",event.currentTarget.dataset.item._id)
   wx.navigateTo({
     url: '/pages/gym/gym?id='+event.currentTarget.dataset.item._id,
   })
  },
  govideo()
  {
    wx.navigateTo({
      url: '/pages/home1/home1',
    })
  }
})