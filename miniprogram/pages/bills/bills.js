const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    bills: [],
    selectedDate: '', // 选中的日期字符串，格式：YYYY-MM-DD
    today: '', // 今天的日期字符串
    dailyTotals: [] // 每日货币统计
  },

  onShow() {
    // 初始化为今天的日期
    const today = new Date()
    const dateStr = this.formatDate(today)
    this.setData({
      selectedDate: dateStr,
      today: dateStr
    })
    this.fetchBills(dateStr)
  },

  // 处理日期选择
  bindDateChange(e) {
    const dateStr = e.detail.value
    this.setData({
      selectedDate: dateStr
    })
    this.fetchBills(dateStr)
  },

  handleImageTap(e) {
    const imageUrl = e.currentTarget.dataset.imageurl
    if (imageUrl) {
      // 收集当前页面所有有图片的记录的图片URL
      const imageUrls = this.data.bills
        .filter(bill => bill.imageUrl)
        .map(bill => bill.imageUrl)

      wx.previewImage({
        urls: imageUrls,
        current: imageUrl
      })
    }
  },

  handleLongPress(e) {
    const billId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '是否要删除这条记录？',
      success: async (res) => {
        if (res.confirm) {
          await this.deleteBill(billId)
        }
      }
    })
  },

  async deleteBill(billId) {
    try {
      wx.showLoading({
        title: '删除中...',
        mask: true
      })

      const bill = await db.collection('records').doc(billId).get()
      
      if (bill.data.imageUrl) {
        await wx.cloud.deleteFile({
          fileList: [bill.data.imageUrl]
        })
      }

      await db.collection('records').doc(billId).remove()
      
      wx.hideLoading()
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })

      this.fetchBills(this.data.selectedDate)

    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '删除失败',
        icon: 'error'
      })
      console.error('删除失败：', err)
    }
  },

  async fetchBills(dateStr) {
    try {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })

      const startDate = new Date(dateStr)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 1)

      const res = await db.collection('records')
        .where({
          date: _.gte(startDate).and(_.lt(endDate))
        })
        .orderBy('date', 'desc')
        .get()

      const bills = res.data.map(bill => ({
        ...bill,
        dateStr: this.formatDate(bill.date),
        timeStr: this.formatTime(bill.date),
        amount: bill.amount.toFixed(2)
      }))

      // 计算每日货币总和
      const dailyTotals = this.calculateDailyTotals(bills)

      this.setData({ 
        bills,
        dailyTotals
      })
      wx.hideLoading()

    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '获取账单失败',
        icon: 'error',
        duration: 2000
      })
      console.error('获取账单失败：', err)
    }
  },

  calculateDailyTotals(bills) {
    const totals = bills.reduce((acc, bill) => {
      if (!acc[bill.currency]) {
        acc[bill.currency] = 0;
      }
      acc[bill.currency] += parseFloat(bill.amount);
      return acc;
    }, {});

    return Object.entries(totals).map(([currency, amount]) => ({
      currency,
      amount: amount.toFixed(2)
    }));
  },

  formatDate(date) {
    date = new Date(date)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  },

  formatTime(date) {
    date = new Date(date)
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }
})