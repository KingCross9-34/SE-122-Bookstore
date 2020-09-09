// pages/book/book.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: null,
      book: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //var obj = JSON.parse(options.obj)
      //  testObj:本js文件中的对象
      this.setData({
        id: option.id
      })
      //console.log("id ", id)
      var that = this;
      console.log(option.id)
    wx.request({
      url: 'http://localhost:8080/getbook', // +event.currentTarget.dataset.book.id,
      method: "POST",
      data: option.id,
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid") //cookie
      },
      success(res) {
        console.log("response: ");
        console.log(res);
        console.log(res.data);
        that.setData({
          //show: true,
          book: res.data
        })
      }
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

  },

  addToChart: function () {
    var that = this;
    console.log(app.globalData.user.id);
    console.log(that.data.id);
    wx.request({
      url: 'http://localhost:8080/addcart',
      method: "POST",
      data: {
        userid: app.globalData.user.id,
        bookid: that.data.id,
        num: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
    })
  }
})