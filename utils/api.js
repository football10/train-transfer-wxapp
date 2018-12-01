import config from 'config.js'

const domain = config.getDomain;
const HOST_URI = domain + '/wp-json/wp/v2/';
const HOST_URI_JWT = domain + '/wp-json/jwt-auth/v1/';
const HOST_URI_WATCH_LIFE_JSON = domain + '/wp-json/watch-life-net/v1/';
const HOST_TRAIN_TRANSFER_URI = domain + '/train-transfer/';

export default {
  postDelSignUpUrl(){
    return HOST_URI_WATCH_LIFE_JSON + "post/delsignup";
  },

  //判断当前用户是否报名
  postIsSignupUrl() {
    return HOST_URI_WATCH_LIFE_JSON + "post/issignup";
  },

//取得报名列表
  getSignUpList(id) {
    return HOST_URI_WATCH_LIFE_JSON + "post/signuplist/" + id;
  },

  //取得报名总人数
  getSignUpCount(id) {
    return HOST_URI_WATCH_LIFE_JSON + "post/signupcount/" + id;
  },

  //判断当前用户是否点赞
  postIsLikeUrl() {
    return HOST_URI_WATCH_LIFE_JSON + "post/islike";
  },

  //赞赏,获取支付密钥
  postPraiseUrl() {
    return 'https://' + domain + "/wp-wxpay/pay/app.php";
  },

  //更新赞赏数据
  updatePraiseUrl() {
    return HOST_URI_WATCH_LIFE_JSON + "praise";
  },

  //足球报名测试
  foodballTest() {
    return HOST_FOOTBALL_URI + "json";
  },

  // 获取我参与活动的一览
  foodballProposerEventList() {
    return HOST_FOOTBALL_URI + 'event/getProposerEventList';
  },

  // 获取我报名活动的一览
  foodballCreateEventList() {
    return HOST_FOOTBALL_URI + 'event/getCreateEventList';
  },

  // 获取报名详细
  foodballEventDetail() {
    return HOST_FOOTBALL_URI + 'event/getEventDetail';
  },

  //创建报名
  createFoodballEvent() {
    return HOST_FOOTBALL_URI + 'event/createEvent';
  },
  //报名
  postSignUpUrl() {
    return HOST_FOOTBALL_URI + "event/proposerEvent";
  },

  //获取检索结果
  getStationNameList() {
    return HOST_TRAIN_TRANSFER_URI + 'data/getStationNameList';
  },

  //获取用户openid
  getOpenidUrl(code) {
    return HOST_TRAIN_TRANSFER_URI + 'common/getOpenId?code=' + code;
  },

  //取得最新查询
  getSelectHistory() {
    return HOST_TRAIN_TRANSFER_URI + 'data/getSelectHistory';
  },

  //登入最新查询
  getRegSelectHistory() {
    return HOST_TRAIN_TRANSFER_URI + 'data/regSelectHistory';
  },

  //取得收藏站点
  getCollectionStation() {
    return HOST_TRAIN_TRANSFER_URI + 'data/getCollectionStation';
  },

  //取得附近站点
  getNearbyStation() {
    return HOST_TRAIN_TRANSFER_URI + 'data/getNearbyStation';
  },
};