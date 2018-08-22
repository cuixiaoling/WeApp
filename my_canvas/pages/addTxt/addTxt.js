//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    content:'',
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    this.data.content = e.detail.value;
    this.setData({
      content:e.detail.value
    })
  },
  toIndex:function(){
    wx.navigateTo({url:"../index/index?txtIndex="+this.data.content})
  },
  onLoad: function(option){
    this.setData({
      content:option.txt
    })
  },
})
