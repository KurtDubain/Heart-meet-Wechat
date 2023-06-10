// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"cloud1-3gcu92iq35140809"
})
// 云函数入口函数
exports.main = async (event, context) => {
   return cloud.database().collection("list").get();
}