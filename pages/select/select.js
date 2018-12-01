import api from '../../utils/api'
import wxRequest from '../../es6-promise/utils/wxRequest'
var app = getApp();

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    inputValBefore: "",
    tabs: ["最近查询", "收藏站点", "附近站点"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    startEndTrainFlg: true,
    placeholder: '请输入目的地',
    stationList: [],
    stationListForSelectName: [],
    hasLocation: false,
    longitude: 0.0,
    latitude: 0.0,

    delBtnWidth: 180//删除按钮宽度单位（rpx）
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    if (options.placeholder == 'startTrain') {
      that.setData({
        placeholder: '请输入出发地',
      });
    } else {
      that.setData({
        placeholder: '请输入目的地',
        startEndTrainFlg: false
      });
    }
    that.getStationListForOther();
  },
  onShow: function () {
    // 页面显示
  },
  onReady: function () {
    // 页面渲染完成（只触发一次）
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputValBefore: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      inputValBefore: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    var self = this;
    if (self.data.inputVal != self.data.inputValBefore && self.data.inputVal.length > 0) {
      var url = api.getStationNameList();
      var data = {
        "requestInfo": {
          "stationLikeName": self.data.inputVal
        }
      };
      wxRequest
        .postRequest(url, data)
        .then(response => {
          if ("OK" == response.data.responseCode) {
            if (response.data.result.stationCount != 0) {
              self.setData({
                stationListForSelectName: response.data.result.stationList
              });
            } else {
              self.setData({
                stationListForSelectName: []
              });
            }
          } else {
            self.setData({
              stationListForSelectName: []
            });
          }
        });
    }
    this.setData({
      inputValBefore: e.detail.value
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    const index = e.currentTarget.id;
    if (index == 0) {
      this.getStationListForOther();
    } else if (index == 1) {
      this.getStationListForOther();
    } else if (index == 2) {
      this.getLocationData();
    }
  },

  //获取站点列表(附近/最近查询/收藏)
  getStationListForOther() {
    const self = this;
    var url = null;
    var data = null;

    if (self.data.activeIndex == 0) {
      url = api.getSelectHistory();
      data = {
        "requestInfo": {
          "openid": app.globalData.openid
        }
      };
    } else if (self.data.activeIndex == 1) {
      url = api.getCollectionStation();
      data = {
        "requestInfo": {
          "openid": app.globalData.openid
        }
      };
    } else if (self.data.activeIndex == 2) {
      console.log(self.data.hasLocation);
      if (self.data.hasLocation == false) {
        self.setData({
          stationList: []
        });
        return;
      }
      url = api.getNearbyStation();
      data = {
        "requestInfo": {
          "longitude": self.data.longitude,
          "latitude": self.data.latitude
        }
      };
    }
    wxRequest
      .postRequest(url, data)
      .then(response => {
        if ("OK" == response.data.responseCode) {
          if (response.data.result.stationCount != 0) {
            self.setData({
              stationList: response.data.result.stationList
            });
          } else {
            self.setData({
              stationList: []
            });
          }
        } else {
          // Request NG
          self.setData({
            stationList: []
          });
        }
      });
  },
  //getStationListForOther END

  getLocationData: function (e) {
    var that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          hasLocation: true,
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.getStationListForOther(e);
        wx.hideToast();
      },
      fail: function () {
        // fail
        hasLocation: false
      },
      complete: function () {
        // complete
      }
    })
  },
  // getLocationData END

  // 返回选中的站点
  clickItem: function (e) {
    const that = this;

    if (that.data.startEndTrainFlg) {
      getApp().globalData.startTrainCode = e.currentTarget.dataset.code;
      getApp().globalData.startTrainEn = e.currentTarget.dataset.en;
      getApp().globalData.startTrainCn = e.currentTarget.dataset.cn;
      getApp().globalData.startTrainJp = e.currentTarget.dataset.jp;
    } else {
      getApp().globalData.endTrainCode = e.currentTarget.dataset.code;
      getApp().globalData.endTrainEn = e.currentTarget.dataset.en;
      getApp().globalData.endTrainCn = e.currentTarget.dataset.cn;
      getApp().globalData.endTrainJp = e.currentTarget.dataset.jp;
    }
    wx.redirectTo({
      url: '/pages/all/all'
    });
  },

});