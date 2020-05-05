import { request } from "../../request/index.js"

//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[],
    cateList:[],
    floorList:[],
  },
  //options(Object)
  onLoad: function(options){
    //1.异步请求
    // wx.request({
    //   url: '/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    // this.getCateList();
    // this.getFloorList();
  },
    goXingLi(){
        wx.navigateTo({
            url: '/pages/order/index'
        })
    },
    goZuJie(){
        wx.navigateTo({
            url: '/pages/orderDetail/index'
        })
    },
    getTestData(){
        request({url: "http://localhost:8080/test"})
            .then(result => {
                // this.setData({
                //     swiperList: result.data.message
                // })
                console.log(result);
            })
    },
    sendDataToBack(){
        wx.request({
            url:'http://localhost:8080/post',
            header: { 'Content-Type': 'application/json' },
            data: {
                "sendKey":"hhhhhhhhh"
            },
            method: 'post',
            success: function (res) {
                console.log("成功");
                console.log(res);
            }
        })
    },
  getSwiperList(){
    request({url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
        .then(result => {
          this.setData({
            swiperList: result.data.message
          })
        })
  },
});