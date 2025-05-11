Page({
  data: {
    project: '',
    duration: 0,
    intensity: '',
    date: new Date().toISOString().split('T')[0]
  },
  onLoad: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
  },
  inputProject: function (e) {
    this.setData({
      project: e.detail.value
    });
  },
  inputDuration: function (e) {
    this.setData({
      duration: e.detail.value
    });
  },
  inputIntensity: function (e) {
    this.setData({
      intensity: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  submitRecord: function () {
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        project: this.data.project,
        duration: this.data.duration,
        intensity: this.data.intensity,
        date: this.data.date
      },
      success: res => {
        wx.showToast({
          title: '打卡成功'
        });
        this.setData({
          project: '',
          duration: 0,
          intensity: '',
          date: new Date().toISOString().split('T')[0]
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '打卡失败'
        });
      }
    });
  }
});    