const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try {
    const res = await db.collection('fitness_records')
     .where({
        openid: wxContext.OPENID
      })
     .get();
    return res;
  } catch (e) {
    console.error(e);
  }
};    