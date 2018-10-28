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
    // TODO START
     //getStationForOtherResult: true,
     //stationList: [{
      // stationNameCN: '函館',
       //stationNameJP: '函館JP',
       //stationNameRoman: 'hakodate',
     //},
     //{
       //stationNameCN: '五稜郭',
       //stationNameJP: '五稜郭JP',
       //stationNameRoman: 'goryoukaku'
     //}],
    // TODO END
    placeholder: '请输入目的地',
    eventKbn: ['中文查询', '日文查询'],
    eventKbn_index: 0
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
    } else if (index == '2') {
      that.setData({
        select: 'shoucang',
      })
    } else if (index == '3') {
      that.setData({
        select: 'fujin',
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
             displFlg: false
           });
         } else {
           self.setData({
             getStationForOtherResult: false,
             stationList: [],
             displFlg: ture
           });
         }
       } else {
         // Request NG
         self.setData({
           getStationForOtherResult: false,
           stationList: [],
           displFlg: ture
         });
       }
     })
  },

  //返回选中的站
  returnItemValue: function(e) {

    console.log(e);
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
  },

  //左滑刪除操作START
  //手指刚放到屏幕触发
  touchS: function (e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.stationList;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        stationList: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.stationList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        stationList: list
      });
    }
  }
  //左滑刪除操作END

})

