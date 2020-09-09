// pages/cart/cart.js
const app = getApp();
var util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    choose: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getcart',
      method: "POST",
      data: app.globalData.user.id,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        that.setData({cart: res.data})
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

  checkboxchange: function(e) {
    this.setData({choose: e.detail.value});
    console.log(e.detail.value);
  },

  remove: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/removecart',
      method: "POST",
      data: {
        userid: app.globalData.user.id,
        removeCartItem: that.data.choose
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        that.setData({cart: res.data})
      }
    })
  },

  buy: function() {
    var that = this;
    var curtime = util.formatTime(new Date());
    if (that.data.choose.length == 0)
      return;
    console.log(curtime);
    wx.request({
      url: 'http://localhost:8080/order',
      method:"POST",
      data: {
        userid: app.globalData.user.id,
        time: curtime,
        orders: that.data.choose
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          that.onLoad();
          wx.navigateTo({
            url: '../orderinfo/orderinfo?info='+JSON.stringify(res.data.data),
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  showHome: function() {
    wx.navigateTo({
      url: '../books/books',
    })
  }
})