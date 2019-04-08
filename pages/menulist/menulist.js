// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    listData: [],
    activeIndex: 0,
    cartList: {},
    sumMonney: 0,
    cupNumber: 0,
    showCart: false,
    discount_rule: [{ a: 15, b: 3 }, { a: 30, b: 8 }, { a: 50, b: 16 }],
    discount_max:0,
    discount_money:0,
    man_jian:0,
    canhefei:0,
    peisongfei: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = options.type;
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    console.log(sysinfo)
    wx.showLoading({
      title: '加载中...',
    })
    //将本来的后台换成了easy-mock 的接口，所有数据一次请求完 略大。。
    wx.request({
      url: 'https://easy-mock.com/mock/59abab95e0dc66334199cc5f/coco/aa',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        console.log(res)
        that.setData({
          type: type,
          canhefei: type==2?2:0,
          peisongfei: type == 2 ? 5 : 0,
          listData: res.data,
          loading: true
        })
      }
    })
  },
  selectMenu: function(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
    })
  },
  add: function(e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;

    var d = this.data;
    var item = d.listData[type].foods[index];
    var tempList = d.cartList;
    if (tempList[item.item_id]){
      tempList[item.item_id].number++;
    }else{
      tempList[item.item_id] = {
        "name": item.name,
        "price": item.specfoods[0].price,
        "detail": undefined,
        "number": 1,
        "sum": 0,
        "id": item.item_id
      }
    }
    var sumMonney = d.sumMonney + item.specfoods[0].price;
    tempList[item.item_id].sum = tempList[item.item_id].sum + item.specfoods[0].price
    var discount_max = 0;
    var discount_money = 0;
    var man_jian = 0;
    var size = d.discount_rule ? d.discount_rule.length:0;
    for (var i = 0; i < size; i++) {
      if (sumMonney < d.discount_rule[i].a){
        discount_max = d.discount_rule[i].a;
        discount_money = d.discount_rule[i].b;
        break;
      }else{
        man_jian = d.discount_rule[i].b;
      }
    }

    this.setData({
      cartList: tempList,
      sumMonney: sumMonney,
      cupNumber: d.cupNumber + 1,
      discount_max: discount_max,
      discount_money: discount_money,
      man_jian: man_jian
    })
  },
  reduce: function(e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;

    var d = this.data;
    var item = d.listData[type].foods[index];
    var tempList = d.cartList;
    if (tempList[item.item_id]) {
      tempList[item.item_id].number--;
      tempList[item.item_id].sum = tempList[item.item_id].sum - item.specfoods[0].price
      if (tempList[item.item_id].number == 0){
        delete tempList[item.item_id];
      }
      var sumMonney = d.sumMonney - item.specfoods[0].price;
      var discount_max = 0;
      var discount_money = 0;
      var man_jian = 0;
      var size = d.discount_rule ? d.discount_rule.length:0;
      for (var i = 0; i < size; i++) {
        if (sumMonney <= d.discount_rule[i].a) {
          discount_max = d.discount_rule[i].a;
          discount_money = d.discount_rule[i].b;
          break;
        }else{
          var man_jian = d.discount_rule[i].b;
        }
      }

      this.setData({
        cartList: tempList,
        sumMonney: sumMonney,
        cupNumber: d.cupNumber - 1,
        discount_max: discount_max,
        discount_money: discount_money,
        man_jian: man_jian

      })
    } 
  },

 
  /**
   * 显示购物车弹框
   */
  showCartList: function() {
    if (this.data.cupNumber != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  clearCartList: function() {
    this.setData({
      cartList: {},
      showCart: false,
      sumMonney: 0,
      cupNumber: 0
    });
  },
  addNumber: function(e) {
    var d = this.data;
    var key = e.currentTarget.dataset.key;
    var tempList = d.cartList;
    if (tempList[key]) {
      tempList[key].number++;
      var sumMonney = d.sumMonney + tempList[key].price;
      tempList[key].sum = tempList[key].sum + tempList[key].price;
      var discount_max = 0;
      var discount_money = 0;
      var man_jian = 0;
      var size = d.discount_rule ? d.discount_rule.length:0;
      for (var i = 0; i < size; i++) {
        if (sumMonney <= d.discount_rule[i].a) {
          discount_max = d.discount_rule[i].a;
          discount_money = d.discount_rule[i].b;
          break;
        }else{
          man_jian = d.discount_rule[i].b;
        }
      }
      this.setData({
        cartList: tempList,
        sumMonney: sumMonney,
        cupNumber: d.cupNumber + 1,
        discount_max: discount_max,
        discount_money: discount_money,
        man_jian: man_jian
      })
    } 
  },
  decNumber: function(e) {
    var d = this.data;
    var key = e.currentTarget.dataset.key;
    var tempList = d.cartList;
    if (tempList[key]) {
      tempList[key].number--;
      var sumMonney = d.sumMonney - tempList[key].price;
      tempList[key].sum = tempList[key].sum - tempList[key].price
      if (tempList[key].number == 0){
        delete tempList[key];
      }
      var cupNumber = d.cupNumber - 1;

      var discount_max = 0;
      var discount_money = 0;
      var man_jian = 0;
      var size = d.discount_rule ?d.discount_rule.length:0;
      for (var i = 0; i < size; i++) {
        if (sumMonney <= d.discount_rule[i].a) {
          discount_max = d.discount_rule[i].a;
          discount_money = d.discount_rule[i].b;
          break;
        }else{
          man_jian = d.discount_rule[i].b;
        }
      }

      this.setData({
        cartList: tempList,
        sumMonney: sumMonney,
        cupNumber: cupNumber,
        showCart: cupNumber != 0,
        discount_max: discount_max,
        discount_money: discount_money,
        man_jian: man_jian
        
      })
    } 
  },
  goBalance: function() {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('man_jian', this.data.man_jian);
      wx.setStorageSync('canhefei', this.data.canhefei);
      wx.setStorageSync('peisongfei', this.data.peisongfei);
      wx.navigateTo({
        url: this.data.type == 1 ? '../order/balance/balance' : '../order/outorder/outorder'
      })


    }
  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})