import api from '../../utils/api'
import wxRequest from '../../es6-promise/utils/wxRequest'
var app = getApp();

Page({
  data: {
    displFlg: false,
    select: '',
    startEndTrainFlg: true,
    getStationForNameResult: false,
    //getStationForOtherResult: false,
    //stationList: [],
    getStationForOtherResult: true,
    stationList: [{
      stationNameCN: '函館',
      stationNameJP: '函館JP',
      stationNameRoman: 'hakodate',
    },
    {
      stationNameCN: '五稜郭',
      stationNameJP: '五稜郭JP',
      stationNameRoman: 'goryoukaku'
    }],
    placeholder: '请输入目的地',
    eventKbn: ['中文查询', '日文查询'],
    eventKbn_index: 0,
    zuijin: [{
        name: '函館',
        en: 'hakodate',
      },
      {
        name: '五稜郭',
        en: 'goryoukaku'
      },
      {
        name: '桔梗',
        en: 'kikyou'
      },
      {
        name: '大中山',
        en: 'oonakayama'
      },
      {
        name: '七飯',
        en: 'nanae'
      },
      {
        name: '新函館北斗',
        en: 'shinhakodatehokuto'
      },
      {
        name: '仁山',
        en: 'niyama'
      },
      {
        name: '大沼',
        en: 'oonuma'
      },
      {
        name: '大沼公園',
        en: 'oonumakouen'
      },
      {
        name: '赤井川',
        en: 'akaikawa'
      },
      {
        name: '駒ケ岳',
        en: 'komagatake'
      },
      {
        name: '東山',
        en: 'higashiyama'
      },
      {
        name: '姫川',
        en: 'himekawa'
      },
      {
        name: '池田園',
        en: 'ikedaen'
      },
      {
        name: '流山温泉',
        en: 'nagareyamaonsen'
      },
      {
        name: '銚子口',
        en: 'choushiguchi'
      },
      {
        name: '鹿部',
        en: 'shikabe'
      },
    ],

    fujin: [{
        name: '駒ケ岳',
        en: 'komagatake'
      },
      {
        name: '東山',
        en: 'higashiyama'
      },
      {
        name: '姫川',
        en: 'himekawa'
      },
      {
        name: '池田園',
        en: 'ikedaen'
      },
      {
        name: '流山温泉',
        en: 'nagareyamaonsen'
      },
      {
        name: '銚子口',
        en: 'choushiguchi'
      },
      {
        name: '鹿部',
        en: 'shikabe'
      },
      {
        name: '函館',
        en: 'hakodate',
      },
      {
        name: '五稜郭',
        en: 'goryoukaku'
      },
      {
        name: '桔梗',
        en: 'kikyou'
      },
      {
        name: '大中山',
        en: 'oonakayama'
      },
      {
        name: '七飯',
        en: 'nanae'
      },
      {
        name: '新函館北斗',
        en: 'shinhakodatehokuto'
      },
      {
        name: '仁山',
        en: 'niyama'
      },
      {
        name: '大沼',
        en: 'oonuma'
      },
      {
        name: '大沼公園',
        en: 'oonumakouen'
      },
      {
        name: '赤井川',
        en: 'akaikawa'
      },
    ],

    shoucang: [{
        name: '姫川',
        en: 'himekawa'
      },
      {
        name: '池田園',
        en: 'ikedaen'
      },
      {
        name: '流山温泉',
        en: 'nagareyamaonsen'
      },
      {
        name: '銚子口',
        en: 'choushiguchi'
      },
      {
        name: '鹿部',
        en: 'shikabe'
      },
      {
        name: '函館',
        en: 'hakodate',
      },
      {
        name: '五稜郭',
        en: 'goryoukaku'
      },
      {
        name: '駒ケ岳',
        en: 'komagatake'
      },
      {
        name: '東山',
        en: 'higashiyama'
      },
      {
        name: '桔梗',
        en: 'kikyou'
      },
      {
        name: '大中山',
        en: 'oonakayama'
      },
      {
        name: '七飯',
        en: 'nanae'
      },
      {
        name: '新函館北斗',
        en: 'shinhakodatehokuto'
      },
      {
        name: '仁山',
        en: 'niyama'
      },
      {
        name: '大沼',
        en: 'oonuma'
      },
      {
        name: '大沼公園',
        en: 'oonumakouen'
      },
      {
        name: '赤井川',
        en: 'akaikawa'
      },
    ],

    shousuo: [{
        name: '仁山',
        en: 'niyama'
      },
      {
        name: '大沼',
        en: 'oonuma'
      },
      {
        name: '大沼公園',
        en: 'oonumakouen'
      },
      {
        name: '姫川',
        en: 'himekawa'
      },
      {
        name: '池田園',
        en: 'ikedaen'
      },
      {
        name: '流山温泉',
        en: 'nagareyamaonsen'
      },
      {
        name: '銚子口',
        en: 'choushiguchi'
      },
      {
        name: '鹿部',
        en: 'shikabe'
      },
      {
        name: '函館',
        en: 'hakodate',
      },
      {
        name: '五稜郭',
        en: 'goryoukaku'
      },
      {
        name: '駒ケ岳',
        en: 'komagatake'
      },
      {
        name: '東山',
        en: 'higashiyama'
      },
      {
        name: '桔梗',
        en: 'kikyou'
      },
      {
        name: '大中山',
        en: 'oonakayama'
      },
      {
        name: '七飯',
        en: 'nanae'
      },
      {
        name: '新函館北斗',
        en: 'shinhakodatehokuto'
      },
      {
        name: '赤井川',
        en: 'akaikawa'
      },
    ],
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
      select: 'fujin',
      testData1: this.data.fujin
    });
    console.log("testData : " + this.data.testData);
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
              testData: response.data.result.stationList,
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
        select: 'fujin',
      });
    } else if (index == '2') {
      that.setData({
        select: 'zuijin',
      })
    } else if (index == '3') {
      that.setData({
        select: 'shoucang',
      })
    }
    that.getStationListForOther();
  },

//获取站点列表(附近/最近查询/收藏)
  getStationListForOther() {
   const self = this;
   var url = null;
   var data = null;

   if (self.data.select == 'fujin') {
     url = api.getSelectHistory();
     data = {
       "requestInfo": {
         "openid": app.globalData.openid
       }
     };
   } else if (self.data.select == 'zuijin') {
     url = api.getSelectHistory();
     data = {
       "requestInfo": {
         "openid": app.globalData.openid
       }
     };
   } else if (self.data.select == 'shoucang') {
     url = api.getSelectHistory();
     data = {
       "requestInfo": {
         "openid": app.globalData.openid
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
             displFlg: ture
           });
         } else {
           self.setData({
             getStationForOtherResult: true,
             stationList: [{
               stationGroupCode: "1234567",
               stationNameCN: '函館',
               stationNameJP: '函館',
               stationNameRoman: 'hakodate',
             }],
             displFlg: ture
           });
         }
       } else {
         // Request NG
         self.setData({
           getStationForOtherResult: true,
           stationList: [{
             stationGroupCode: "1234567",
             stationNameCN: 'リクエストエラー',
             stationNameJP: 'リクエストエラー',
             stationNameRoman: 'requestError',
           }],
           displFlg: ture
         });
       }
     })
  },

  //返回选中的站
  returnItemValue: function(e) {
    const that = this;
    if (that.data.startEndTrainFlg) {
      getApp().globalData.startTrain = e.currentTarget.dataset.id;
    } else {
      getApp().globalData.endTrain = e.currentTarget.dataset.id;
    }
    wx.redirectTo({
      url: '/pages/all/all'
    });
  },

  //监听时间picker选择器
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      eventKbn_index: e.detail.value
    });
  }, 

  showDelete: function (e) {
    console.log("======showDelete Event======");
    console.log(e);
  }
})

