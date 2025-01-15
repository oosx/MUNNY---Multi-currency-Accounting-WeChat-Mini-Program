App({
    onLaunch: function () {
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          env: 'your-env-id', // 已移除敏感的云环境 ID
          traceUser: true
        })
      }
    }
  })