import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    array: ['机场', '火车', '酒店'],
    index: 0,
    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiArray1: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    imgs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDatePicker();
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  onSubmit: function (e, username, userMobile) {

    console.log(username);
    console.log(userMobile);

    // this.setData({
    //
    //   allValue: e.detail.value
    //
    // })

  },

  getDatePicker(){
    request({url: "http://localhost:8080/datePicker"})
        .then(result => {
          console.log(result.data.message);
          const datePicker = result.data.message;
          // wx.setStorageSync("datePicker", result.data.message);
          this.setData({
            ['multiArray[0]']: datePicker.monthAndDay,
            ['multiArray[1]']: datePicker.hour,
            ['multiArray[2]']: datePicker.time,
            ['multiArray1[0]']: datePicker.monthAndDay,
            ['multiArray1[1]']: datePicker.hour,
            ['multiArray1[2]']: datePicker.time,
          });
          // console.log(this.multiArray);
        })
    // wx.request({
    //   url: 'http://localhost:8080/datePicker', //仅为示例，并非真实的接口地址
    //   success : (result) =>  {
    //     console.log(result.data.message)
    //     this.setData({
    //             ['multiArray[0]']: datePicker.monthAndDay,
    //             ['multiArray[1]']: datePicker.hour,
    //             ['multiArray[2]']: datePicker.time,
    //           });
    //     console.log(this.multiArray)
    //   }
    // })
  },

  afterRead(event) {
    const {file} = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: {user: 'test'},
      success(res) {
        // 上传完成需要更新 fileList
        const {fileList = []} = this.data;
        fileList.push({...file, url: res.data});
        this.setData({fileList});
      }
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },

  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const datePicker = wx.getStorageSync("datePicker");
    // // console.log(datePicker.monthAndDay)
    // this.setData({
    //   ['multiArray[0]']: datePicker.monthAndDay,
    //   ['multiArray[1]']: datePicker.hour,
    //   ['multiArray[2]']: datePicker.time,
    // });
    this.getDatePicker();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})