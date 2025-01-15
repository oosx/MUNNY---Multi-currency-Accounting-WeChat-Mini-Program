const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    periods: ['今日', '本周', '本月', '今年'],
    periodIndex: 0,
    currencySummary: []
  },

  onShow() {
    this.fetchData()
  },

  bindPeriodChange(e) {
    this.setData({
      periodIndex: e.detail.value
    }, () => {
      this.fetchData()
    })
  },

  getDateRange() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch(parseInt(this.data.periodIndex)) {
      case 0: // 今日
        return {
          start: today,
          end: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      case 1: // 本周
        const dayOfWeek = today.getDay() || 7
        return {
          start: new Date(today.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000),
          end: new Date(today.getTime() + (8 - dayOfWeek) * 24 * 60 * 60 * 1000)
        }
      case 2: // 本月
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }
      case 3: // 今年
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: new Date(now.getFullYear() + 1, 0, 1)
        }
    }
  },

  async fetchData() {
    try {
      wx.showLoading({ title: '加载中...', mask: true })

      const dateRange = this.getDateRange()
      const res = await db.collection('records')
        .where({
          date: _.gte(dateRange.start).and(_.lt(dateRange.end))
        })
        .get()

      // 按货币分组统计
      const summary = {}
      res.data.forEach(record => {
        const currency = record.currency
        if (!summary[currency]) summary[currency] = 0
        summary[currency] += record.amount
      })

      this.setData({
        currencySummary: Object.entries(summary).map(([currency, amount]) => ({
          currency,
          amount: amount.toFixed(2)
        }))
      })

      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '获取数据失败',
        icon: 'error',
        duration: 2000
      })
      console.error('获取数据失败：', err)
    }
  }
})