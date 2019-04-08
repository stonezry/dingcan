const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus:[],
    storeInfo:{},
    extand:false
  },

  //点击事件
  clickto: function (e) {
    console.log(e.currentTarget.dataset.id)//打印数据
    var id = e.currentTarget.dataset.id
    switch(id){
      case 1:
        wx.navigateTo({
          url: '../menulist/menulist?type=1',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../menulist/menulist?type=2',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../order/cashrec/cashrec',
        })
        break;

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })

    wx.setNavigationBarTitle({
      title: '五谷鱼粉',
    })
    this.setData({
      extand:false,
      storeInfo: {
        id:1,
        headimg: "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
        storename: "五谷鱼粉",
        peisong:"配送范围3公里|0元起送",
        status:1,
        imgs: ["https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2541662397.jpg", "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2543163892.jpg", "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2541280047.jpg"],
        address: "厦门市湖里区35号",
        lat: 24.489231,
        lon: 118.103886,
        phone: "18950459553",
        yingye_time:"5:00-22:00",
        weixin:"123335",
        qq:"545584100",
        perprice:25,
        star: 4,
        discountMsg: ["满15减3", "满30减8", "满50减16"]
        },
      loading: false,
      menus: [{ img: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2541662397.jpg", title: "点餐", id: 1 }, { img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2543163892.jpg", title: "外卖", id: 2 }, { img: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2541280047.jpg", title: "收银", id: 4 }
      ]
    }) 
    wx.hideLoading()

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
  extandto: function (e){
    var that = this;
    // 获取事件绑定的当前组件
    var ext = e.currentTarget.dataset.extand;
    this.setData({
      extand: !ext
    })
  },
  /**
   * 跳转到地图
   */
  jumptomap: function (e) {
    var lat = this.data.storeInfo.lat;
    var lon = this.data.storeInfo.lon;
    var storename = this.data.storeInfo.storename;
    var address = this.data.storeInfo.address;
    if (lat && lon){
      wx.openLocation({
        latitude: Number(lat),
        longitude: Number(lon),
        scale: 16,
        name: storename,
        address: address
      })
    }
   
  },
  tel: function () {
    var phone = this.data.storeInfo.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})