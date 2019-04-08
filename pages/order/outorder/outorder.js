// pages/order/outorder/outorder.js
Page({
  /**
    * 页面的初始数据
    */
  data: {
    cartList: [],
    sumMonney: 0,
    man_jian: 0,
    peisongfei:0,
    canhefei:0,
    username:undefined,
    phone: undefined,
    address:undefined

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      man_jian: wx.getStorageSync('man_jian'),
      peisongfei: wx.getStorageSync('peisongfei'),
      canhefei: wx.getStorageSync('canhefei')
    })

  },
  gopay: function () {

    if (this.data.username && this.data.phone && this.data.address){
      wx.navigateTo({
        url: '../outerdetail/outerdetail'
      })
    }else{
      wx.showToast({
        title: '请填写送餐地址',
        icon:'loading',
        duration: 1000
      })
    }

    
  },
  chooseAddress: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success(res) {
              //打开选择地址
              wx.chooseAddress({
                success: function (res) {
                  console.log(res)
                  that.setData({
                    address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                    username: res.userName,
                    phone: res.telNumber
                  });
                }
              })
            },
            fail(res) {
              //用户拒绝授权后执行
              wx.openSetting({
              })
            }
          })
          
        } else {
          //打开选择地址
          wx.chooseAddress({
            success: function (res) {
              console.log(res)
              that.setData({
                address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                username: res.userName,
                phone: res.telNumber
              });
            }
          })
        }
      },
      fail(res) {
        console.log('调用失败')
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

  }
})