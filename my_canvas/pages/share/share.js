//index.js
//获取应用实例
const app = getApp();
import util from '../../utils/util'
Page({
  data: {
    // content:'',
    imgSrc:'',
    myWidth:'',
    myHeight:'',
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    this.data.content = e.detail.value;
    this.setData({
      content:e.detail.value
    })
  },
  saveFun(){
    util.savePicToAlbum(app.globalData.imgSmall);
  },
  onShareAppMessage: function (res) {
      let that = this;
      if (res.from === 'button') {
      }
      return {
        title: 'xixi ~',
        // path: '',//设置点进去的路径
        imageUrl:app.globalData.imgSmall,
        success: function(res) {
          // 转发成功
        },
        fail: function(res) {
          // 转发失败
        }
      }
      
    },
  onLoad: function(option){
    wx.hideShareMenu();
    this.setData({
      imgSrc:app.globalData.imgSmall,
      myWidth:app.globalData.windowWidth,
      myHeight:app.globalData.windowHeight,
    })
  },
})
