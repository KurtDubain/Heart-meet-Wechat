let comment=""
let user=""
let srcI=""
let time=""
let util=require('../../utils/util')
const DB = wx.cloud.database()
let pinglun = new Array()
Page({

    data: {
      imageList: "/images/加.png",
      srcI: '',
      comment:''
    },

    onLoad: function (options) {
      time = util.formatTime(new Date());
      user=wx.getStorageSync('user')
      console.log(time,user)
    },

    uploadImage:function(){
      var that=this;
      wx.chooseMedia({
        count: 9,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success: res=>{
          this.setData({
            srcI:res.tempFiles[0].tempFilePath
          })
          srcI=res.tempFiles[0].tempFilePath
          console.log(srcI)
        }
      })
    },
    //双向绑定文本框的内容
    textinput:function(e){
      comment=e.detail.value
      console.log(comment)
    },

    loadto(){
      console.log(user.nickName,user.avatarUrl,time)
      DB.collection("dongtai").add({
        data:{   
          nicheng: user.nickName,
          picture: srcI,
          pinglun: pinglun,
          text: comment,
          time: time,
          touxiang: user.avatarUrl
        }
      })
      wx.navigateBack({
        delta: 2   ,
        events : {
          infoChange : function () {
            that.onPullDownRefresh();
          }
        }
      })
    },
})

