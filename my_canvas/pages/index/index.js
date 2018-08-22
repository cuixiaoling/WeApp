//index.js
//获取应用实例
const app = getApp();
import util from '../../utils/util'

Page({
  data: {
    myWidth:null,
    myHeight:null,
    showTi:false,
    hoverBgL:'#eaeaea',
    hoverBgR:'',
    tabShow:true,
    imageList:['../../images/type1/1.jpg','../../images/type1/2.jpg','../../images/type1/3.jpg','../../images/type1/4.jpg'
    ,'../../images/type1/5.jpg','../../images/type1/6.jpg','../../images/type1/7.jpg','../../images/type1/8.jpg'
    ,'../../images/type1/9.jpg','../../images/type1/10.jpg'],
    choseImgSrc:'',
    x:0,
    y:0,
    selectTxt:'xixi',
    startX:0,
    startY:0,
    endX :0,
    endY :0,
    imgSmall:'',
    showToastTxt:true,
    positionLeft:'50%',
    positionTop:'180',
  },
  seleceImg(){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths);
      // 文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，
      //需在主动调用 wx.saveFile，在小程序下次启动时才能访问得到。
      wx.saveFile({
           tempFilePath: tempFilePaths[0],
           success: function(res) {
             var savedFilePath = res.savedFilePath;
             app.globalData.imgPhone = res.savedFilePath;
             console.log(savedFilePath)
             that.setData({
               choseImgSrc:savedFilePath
             })
             that.drawImgFun(that.data.choseImgSrc,app.globalData.windowWidth*0.5,160,that.data.selectTxt);
           }
         })
      }
     })
   },
   // 选择图片
  chooseImgFun(target){
    console.log(target.currentTarget.dataset.src);
    let mySrc = target.currentTarget.dataset.src;
    this.data.choseImgSrc = mySrc;
    this.drawImgFun(mySrc,app.globalData.windowWidth*0.5,160,this.data.selectTxt);
    app.globalData.imgPhone = mySrc;
  },
  // 修改文案
  drawTxt:function(ctx,x,y,content,color){
    ctx.setFontSize(40);
    ctx.setFillStyle(color); //颜色一定要上面写好
    ctx.setTextAlign('center');
    ctx.fillText(content,x,y);
  },
  // 画图
  drawImgFun(src,x,y,content){
    let ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(src,0,0,app.globalData.windowWidth,app.globalData.windowWidth);
    this.drawTxt(ctx,x,y,content,"#ffffff");
    ctx.draw();
  },
  tart: function(e) {//开始
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
    },
  move: function(e){//滑动
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y,
      positionLeft:e.touches[0].x+'px',
      positionTop:e.touches[0].y+20,
    })
    this.drawImgFun(this.data.choseImgSrc,this.data.x,this.data.y,this.data.selectTxt);
  },
  end: function(e) {//结束
   this.setData({
     hidden: true
   })
   this.data.endX = this.data.x
   this.data.endY = this.data.Y
   console.log(this.data.endX,'end')
   console.log(this.data.startX,'startX')
   if(this.data.endX == this.data.startX){
      wx.navigateTo({url:"../addTxt/addTxt?txt="+this.data.selectTxt})
   }
   this.data.startX = this.data.x;
   this.data.startY = this.data.y;
  },
  // 生成图片
  createPoasterFun(){
    let that = this;
    let myHeight = that.data.myHeight;
    let myWidth = that.data.myWidth;
    wx.canvasToTempFilePath({
      width: myWidth,
      height: myWidth,
      destWidth:myWidth,
      destHeight:myWidth,
      canvasId: 'myCanvas',
      success: res => {
        that.data.imgSmall = res.tempFilePath;
        app.globalData.imgSmall = that.data.imgSmall;
        // console.log( app.globalData.imgSmall,'小图');
        // util.savePicToAlbum(app.globalData.imgSmall,true);
        // wx.downloadFile({
        //   url: this.data.userInfo.avatarUrl,         
        //   success: function (res) {          
        //     that.setData({Img: res.tempFilePath,});
        //     if(that.data.fabuType == 1){
        //       that.createNewImg(that.data.huopanList.length,that.data.imgSmall,that.data.Img);
        //     }else{
        //       that.createNewImgChuanQi(that.data.chuanQiList.length,that.data.imgSmall,that.data.Img);
        //     }
        //     wx.showLoading({
        //       title: '生成中',
        //     })
        //     setTimeout(()=>{
        //       that.savePic();
        //     },2000)
            
        //  },     
        //    fail: function () {console.log('fail')}
        //  })
        wx.navigateTo({url:'../share/share'})
      }
    })
  },
  onLoad: function(option){
    setTimeout(()=>{
      this.setData({
        showTi:true,
      })
    },500)
    this.setData({
      myWidth:app.globalData.windowWidth,
      myHeight:app.globalData.windowHeight,
      choseImgSrc:app.globalData.imgPhone
    })
    if(option.txtIndex){
      this.setData({
        selectTxt:option.txtIndex
      })
    }
    this.drawImgFun(this.data.choseImgSrc,app.globalData.windowWidth*0.5,160,this.data.selectTxt);
    console.log(this.data.myWidth,this.data.myHeight)
  },
})
