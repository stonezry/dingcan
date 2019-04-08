// pages/order/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,
    orderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderlist: [{ storename: "五谷渔粉", paystatus: "已付款", number: 4, paymoney: 25, id: 3, createtime: 1448864369815, orderid: "438947578347258748027", getorder:"C097"}]
    }) 
  },

  changeTab:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
      orderlist: [{ storename: "五谷渔粉", paystatus: "已付款", number: 4, paymoney: 25, id: 3, createtime: 1448864369815, orderid: "438947578347258748027", getorder: "C097" }]
    })
  },
  golist: function () {
    wx.navigateTo({
      url: '../../menulist/menulist?type=1'
    })
  },
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id
    if(this.data.tabIndex == 0){
      wx.navigateTo({
        url: '../order/detail/detail?id=' + id
      })
    }else{
      wx.navigateTo({
        url: '../order/outerdetail/outerdetail?id=' + id
      })
    }
    
  }
})