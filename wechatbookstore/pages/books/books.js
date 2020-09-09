const app = getApp()
// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksArray:[[]],
    page: 0,
    totalNum: 0,
    carouselImgUrls: [
      "../../assets/book1.jpg",
      "../../assets/book2.jpg",
      "../../assets/book3.jpg",
      "../../assets/book4.jpg"
    ],
    searchValue:"",
    show: false,
    book: null,
    active:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!app.globalData.userLogged){
      wx.navigateTo({
        url: '../index/index'
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/getbooks',
        method: "POST",
        data: {
        },
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid") //cookie
        },
        success(res) {
          console.log(res.data);
          var list = res.data.slice(0, 4);
          console.log(list);
          that.setData({
            ["booksArray["+0+"]"]: list,
            page: 0,
            totalNum: 4
          })
        }
      });
    }
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
    var that = this;
    var page = that.data.page;
    page += 1;
    wx.request({
      url: 'http://localhost:8080/getbooks',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid") //cookie
      },
      success: function(res) {
        var list = res.data.slice(that.data.totalNum, that.data.totalNum+4);
        console.log(list);
        var totalDataCount = that.data.totalNum;
        totalDataCount = totalDataCount + list.length;
        that.setData({
          ["booksArray[" + page + "]"]: list,
          page: page,
          totalNum: totalDataCount
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //点击书籍
  bindViewTap: function (event) {
    console.log(event.currentTarget.dataset.book);
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getbook', // +event.currentTarget.dataset.book.id,
      method: "POST",
      data: event.currentTarget.dataset.book.id,
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid") //cookie
      },
      success(res) {
        console.log("response: ");
        console.log(res);
        console.log(res.data);
        wx.navigateTo({
          url: '../addCartPage/book?id='+ event.currentTarget.dataset.book.id,
        })
        // that.setData({
        //   show: true,
        //   book: res.data
        // })
      }
    })
    //this.setData({ show: true, book: event.currentTarget.dataset.book});
    //console.log(event.currentTarget.dataset.book);
  },

  showCart: function() {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },

  showHome: function() {
    wx.navigateTo({
      url: '../books/books',
    })
  },

  //搜索框
  onChange(e) {
    console.log(e.detail)
    this.setData({
      searchvalue: e.detail
    });
  },

  onSearch() {
    wx.showToast({
      title: '搜索功能还没做，偷个懒！',
      icon: 'none',
      duration: 2000
    })

  },
  //点击遮罩层
  onClickHide() {
    this.setData({ show: false });
  },
  //点击坐下图标
  onClickIcon() {
    wx.showToast({
      title: '客服没钱请！购物车还没做！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击右下按钮
  onClickButton() {
    wx.showToast({
      title: '别买了！！！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击底边栏
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  }
})