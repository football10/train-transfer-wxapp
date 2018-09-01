// pages/result_det/result_det.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_tran1:true,
    show_tran2: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  show_tran1: function(){
    var self = this;
    if (self.data.show_tran1) {
      self.setData({
        show_tran1: false
      })
    } else {
      self.setData({
        show_tran1: true
      })
    }

  },
  show_tran2: function () {
    var self = this;
    if (self.data.show_tran2) {
      self.setData({
        show_tran2: false
      })
    } else {
      self.setData({
        show_tran2: true
      })
    }
  },

  share: function(){
    
  }
})