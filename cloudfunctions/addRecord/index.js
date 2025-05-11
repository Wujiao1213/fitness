const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const recordDate = new Date(event.date)
    // 检查是否存在重复记录
    const existingRecord = await db.collection('fitness_records')
     .where({
        openid: wxContext.OPENID,
        date: recordDate
      })
     .get()
    if (existingRecord.data.length > 0) {
      return {
        errCode: -2,
        errMsg: '今日已打卡，请勿重复打卡'
      }
    }
    return await db.collection('fitness_records').add({
      data: {
        openid: wxContext.OPENID,
        project: event.project,
        duration: event.duration,
        intensity: event.intensity,
        date: recordDate
      }
    })
  } catch (e) {
    console.error('插入数据失败:', e)
    return {
      errCode: -1,
      errMsg: '插入数据失败'
    }
  }
}