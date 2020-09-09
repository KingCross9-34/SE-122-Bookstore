//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: "",
    password: "",
    errorMessage: "",
  },
  //用户名输入
  bindNameInput: function(event){
      this.setData({username : event.detail.value});
      console.log(event.detail.value);
  },
  //密码输入
  bindPasswordInput: function(event){
    this.setData({ password: event.detail.value });
    console.log(event.detail.value);
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/login', // ?username='+this.data.username+'&password='+this.data.password, 
      method: "POST",
      data: {
        username: this.data.username,
        password: this.data.password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.status == 0){
          app.globalData.userLogged = true;
          app.globalData.user = res.data.data;
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]); //存储cookie
          wx.navigateTo({
            url: '../books/books'
          })
        }else{
          that.setData({"errorMessage" : res.data.msg});
          console.log(res.data);
        }
      }
    }); 
  },
  onLoad: function () {
   },
   
})
