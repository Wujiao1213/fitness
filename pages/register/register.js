Page({
  data: {
    account: '',
    password: '',
    confirmPassword: '',
    errorMessage: ''
  },
  onAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },
  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },
  onRegister() {
    const { account, password, confirmPassword } = this.data;
    if (!account || !password || !confirmPassword) {
      this.setData({
        errorMessage: '账号和密码不能为空'
      });
      return;
    }
    if (password !== confirmPassword) {
      this.setData({
        errorMessage: '两次输入的密码不一致'
      });
      return;
    }
    wx.showLoading({
      title: '正在注册...'
    });
    wx.cloud.callFunction({
      name: 'register',
      data: {
        account,
        password
      },
      success: res => {
        wx.hideLoading();
       
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/login/login',
          })
      },
      fail: err => {
        wx.hideLoading();
        console.error('注册失败', err);
        this.setData({
          errorMessage: '注册请求失败，请稍后重试'
        });
      }
    });
  },
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
});