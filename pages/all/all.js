import api from '../../utils/api'
import wxRequest from '../../es6-promise/utils/wxRequest'

var app = getApp();
Page({
  data: {
    startTrainCode:'',
    startTrainEn:'',
    startTrainCn:'',
    startTrainJp:'',
    endTrainCode:'',
    endTrainEn:'',
    endTrainCn:'',
    endTrainJp:''
  },
  onLoad: function (option) {
  },
  onShow: function () {
    this.setData({
      startTrainCode: app.globalData.startTrainCode,
      startTrainEn: app.globalData.startTrainEn,
      startTrainCn: app.globalData.startTrainCn,
      startTrainJp: app.globalData.startTrainJp,
      endTrainCode: app.globalData.endTrainCode,
      endTrainEn: app.globalData.endTrainEn,
      endTrainCn: app.globalData.endTrainCn,
      endTrainJp: app.globalData.endTrainJp
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
    var converTrainCn = that.data.startTrainCn
    that.setData({
      startTrainCn: that.data.endTrainCn,
      endTrainCn: converTrainCn
    })
  },
  join: function () {
    var that = this
    that.postRegSelectHistory();

    wx.navigateTo({
      url: '../results/results'
    })
  },

  postRegSelectHistory() {
    var self = this;
    var url = null;
    var data = null;

    url = api.getRegSelectHistory();

    if (self.data.startTrainCode != "") {
      data = {
        "requestInfo": {
          "openid": app.globalData.openid,
          "stationGroupCode": self.data.startTrainCode,
          "stationNameCN": self.data.startTrainCn,
          "stationNameJP": self.data.startTrainJp,
          "stationNameRoman": self.data.startTrainEn
        }
      };
      wxRequest
        .postRequest(url, data)
        .then(response => {
          if ("OK" == response.data.responseCode) {
            // Request OK
          } else {
            // Request NG
          }
        })
    }

    if (self.data.endTrainCode != "") {
      data = {
        "requestInfo": {
          "openid": app.globalData.openid,
          "stationGroupCode": self.data.endTrainCode,
          "stationNameCN": self.data.endTrainCn,
          "stationNameJP": self.data.endTrainJp,
          "stationNameRoman": self.data.endTrainEn
        }
      };
      wxRequest
        .postRequest(url, data)
        .then(response => {
          if ("OK" == response.data.responseCode) {
            // Request OK
          } else {
            // Request NG
          }
        })
    }
  },
})