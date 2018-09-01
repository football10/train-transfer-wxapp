import api from '../../utils/api'
import wxRequest from '../../es6-promise/utils/wxRequest'
var app = getApp();

Page({
  data: {
    displFlg: false,
    select: '',
    startEndTrainFlg: true,
    result:false,
    testData: [],
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
              result:true
            });
          } else {
            self.setData({
              result: false,
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
    that.getList();
  },
  //获取列表
  getList() {
    const that = this;
    if (that.data.select == 'fujin') {
      that.setData({
        testData1: that.data.fujin
      })
    } else if (that.data.select == 'zuijin') {
      that.setData({
        testData1: that.data.zuijin
      })
    } else if (that.data.select == 'shoucang') {
      that.setData({
        testData1: that.data.shoucang
      })
    }
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
})