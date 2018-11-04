import api from '../../utils/api'
import wxRequest from '../../es6-promise/utils/wxRequest'
var app = getApp();

Page({
  data: {
    displFlg: false,
    select: '',
    startEndTrainFlg: true,
    getStationForNameResult: false,
    stationListForSelectName: [],
    getStationForOtherResult: false,
    stationList: [],
    placeholder: '请输入目的地',
    eventKbn: ['中文查询', '日文查询'],
    eventKbn_index: 0,
    hasLocation: false,
    longitude: 0.0,
    latitude: 0.0
  },
  onLoad: function(option) {
    console.log("onload" + option.placeholder);
    if (option.placeholder == 'startTrain') {
      this.setData({
        placeholder: '请输入出发地',
      });
    } else {
      this.setData({
        placeholder: '请输入目的地',
        startEndTrainFlg: false
      });
    }
    this.setData({
      select: 'zuijin'
    });

    this.getStationListForOther();
  },

  selectEvent: function(e) {

    var value = e.detail.value
    var self = this
    if (value.length == 0) {
      this.setData({
        displFlg: false,
      });
      return;
    }

    var url = null;
    var data = {
      "requestInfo": {
        "stationLikeName": value
      }
    }

    url = api.getStationNameList();
    wxRequest
      .postRequest(url, data)
      .then(response => {
        if ("OK" == response.data.responseCode) {
          if (response.data.result.stationCount != 0) {
            self.setData({
              stationListForSelectName: response.data.result.stationList,
              displFlg: true,
              getStationForNameResult: true
            });
          } else {
            self.setData({
              getStationForNameResult: false,
              displFlg: true,
            });
          }
        } else {
          self.setData({
            displFlg: false
          });
        }
      })
  },

  //切换导航按钮
  navbtn(event) {
    const index = event.currentTarget.dataset.id;
    const that = this;
    if (index == '1') {
      that.setData({
        select: 'zuijin',
      });
      that.getStationListForOther();
    } else if (index == '2') {
      that.setData({
        select: 'shoucang',
      });
      that.getStationListForOther();
    } else if (index == '3') {
      that.setData({
        select: 'fujin',
      });
      console.log("getLocationData start");
      that.getLocationData();
    }
  },

  //获取站点列表(附近/最近查询/收藏)
  getStationListForOther() {
   const self = this;
   var url = null;
   var data = null;

   if (self.data.select == 'zuijin') {
     url = api.getSelectHistory();
     data = {
       "requestInfo": {
         "openid": app.globalData.openid
       }
     };
   } else if (self.data.select == 'shoucang') {
     url = api.getSelectHistory();//TODO
     data = {
       "requestInfo": {
         "openid": app.globalData.openid
       }
     };
   } else if (self.data.select == 'fujin') {
     console.log(self.data.hasLocation);
     if(self.data.hasLocation == false) {
       // 经纬度取不到的时候，终止POST
       console.log("self.data.hasLocation is false");
       self.setData({
         getStationForOtherResult: false,
         stationList: [],
         displFlg: true
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
             stationList: response.data.result.stationList,
             getStationForOtherResult: true,
             displFlg: false
           });
         } else {
           self.setData({
             getStationForOtherResult: false,
             stationList: [],
             //displFlg: true
           });
         }
       } else {
         // Request NG
         self.setData({
           getStationForOtherResult: false,
           stationList: [],
           //displFlg: true
         });
       }
     })
  },
  //getStationListForOther END

  //返回选中的站
  returnItemValue: function(e) {
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

  getLocationData: function(e) {
    var that = this
    wx.getLocation({
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          hasLocation: true,
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.getStationListForOther(e);
      },
      fail: function () {
        // fail
        hasLocation: false
      },
      complete: function () {
        // complete
        hasLocation: false
      }
    })
  }
  // getLocationData END

})

