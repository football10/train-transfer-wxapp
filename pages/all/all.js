
var app = getApp();
Page({
  data: {
    startTrain:'',
    endTrain: '',
  },
  onLoad: function (option) {
  },
  onShow: function () {

    this.setData({
      startTrain: app.globalData.startTrain,
      endTrain: app.globalData.endTrain
      })
  },
  onShareAppMessage: function () {
    return {
      title: '『' + 东京地铁换乘查询 + '』',
      path: 'pages/all/all',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  startTrain: function () {
    wx.redirectTo({
      url: '../select/select?placeholder=startTrain'
    })
  },
  endTrain: function () {

    wx.redirectTo({
      url: '../select/select?placeholder=endTrain'
    })
  },
  convertTrain: function () {
    var that = this
    var converTrain = that.data.startTrain
    that.setData({
      startTrain: that.data.endTrain,
      endTrain: converTrain
    })
  },
  join: function () {
    wx.navigateTo({
      url: '../results/results'
    })
  },
})