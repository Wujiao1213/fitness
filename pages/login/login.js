Page({
  data: {
    account: '',
    password: '',
    errorMessage: ''
  },
  onAccountInput(e) {
    const value = e.detail.value;
    console.log('输入的账号:', value);
    this.setData({
      account: value
    });
  },
  onPasswordInput(e) {
    const value = e.detail.value;
    console.log('输入的密码:', value);
    this.setData({
      password: value
    });
  },
  onLogin() {
    const { account, password } = this.data;
    console.log('账号:', account, '密码:', password);
    if (!account || !password) {
      console.log('账号和密码不能为空');
      this.setData({
        errorMessage: '账号和密码不能为空'
      });
      return;
    }
    wx.showLoading({
      title: '正在登录...'
    });
    wx.cloud.callFunction({
      name: 'login',
      data: {
        account,
        password
      },
      success: res => {

        console.log("success");
        wx.hideLoading();
          wx.switchTab({
            url: '/pages/home/home',
          });
        
      },
      fail: err => {
        console.log("err");
        wx.hideLoading();
        console.error('登录失败', err);
        this.setData({
          errorMessage: '登录请求失败，请稍后重试'
        });
      }
    });
  },
  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
});  