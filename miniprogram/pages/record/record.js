const db = wx.cloud.database()
const NO_DECIMAL_CURRENCIES = ['JPY', 'KRW', 'VND', 'HUF', 'CLP', 'ISK', 'IDR', 'LAK', 'KHR', 'KPW', 'IRR', 'UGX', 'MNT', 'PYG'];

Page({
  data: {
    topCurrencies: [
      { code: 'CNY', display: '人民币' },
      { code: 'HKD', display: '港币' },
      { code: 'MOP', display: '澳门元' },
      { code: 'TWD', display: '新台币' }
    ],
    allCurrencies: [
      { code: 'USD', display: '美元' },
      { code: 'EUR', display: '欧元' },
      { code: 'GBP', display: '英镑' },
      { code: 'JPY', display: '日元' },
      { code: 'KRW', display: '韩元' },
      { code: 'AUD', display: '澳大利亚元' },
      { code: 'CAD', display: '加拿大元' },
      { code: 'SGD', display: '新加坡元' },
      { code: 'MYR', display: '马来西亚林吉特' },
      { code: 'CHF', display: '瑞士法郎' },
      { code: 'NZD', display: '新西兰元' },
      { code: 'THB', display: '泰铢' },

      
      { code: 'AED', display: '阿联酋迪拉姆' },
      { code: 'AFN', display: '阿富汗尼' },
      { code: 'ALL', display: '阿尔巴尼亚列克' },
      { code: 'AMD', display: '亚美尼亚德拉姆' },
      { code: 'ANG', display: '荷属安的列斯盾' },
      { code: 'AOA', display: '安哥拉宽扎' },
      { code: 'ARS', display: '阿根廷比索' },
      // { code: 'AUD', display: '澳大利亚元' },
      { code: 'AWG', display: '阿鲁巴弗罗林' },
      { code: 'AZN', display: '阿塞拜疆马纳特' },
      { code: 'BAM', display: '波斯尼亚和黑塞哥维那可兑换马克' },
      { code: 'BBD', display: '巴巴多斯元' },
      { code: 'BDT', display: '孟加拉塔卡' },
      { code: 'BGN', display: '保加利亚列弗' },
      { code: 'BHD', display: '巴林第纳尔' },
      { code: 'BIF', display: '布隆迪法郎' },
      { code: 'BMD', display: '百慕大元' },
      { code: 'BND', display: '文莱元' },
      { code: 'BOB', display: '玻利维亚诺' },
      { code: 'BRL', display: '巴西雷亚尔' },
      { code: 'BSD', display: '巴哈马元' },
      { code: 'BTN', display: '不丹努尔特鲁姆' },
      { code: 'BWP', display: '博茨瓦纳普拉' },
      { code: 'BYN', display: '白俄罗斯卢布' },
      { code: 'BZD', display: '伯利兹元' },
      // { code: 'CAD', display: '加拿大元' },
      { code: 'CDF', display: '刚果法郎' },
      // { code: 'CHF', display: '瑞士法郎' },
      { code: 'CLP', display: '智利比索' },
      // { code: 'CNY', display: '人民币' },
      { code: 'COP', display: '哥伦比亚比索' },
      { code: 'CRC', display: '哥斯达黎加科朗' },
      { code: 'CUP', display: '古巴比索' },
      { code: 'CVE', display: '佛得角埃斯库多' },
      { code: 'CZK', display: '捷克克朗' },
      { code: 'DJF', display: '吉布提法郎' },
      { code: 'DKK', display: '丹麦克朗' },
      { code: 'DOP', display: '多米尼加比索' },
      { code: 'DZD', display: '阿尔及利亚第纳尔' },
      { code: 'EGP', display: '埃及镑' },
      { code: 'ERN', display: '厄立特里亚纳克法' },
      { code: 'ETB', display: '埃塞俄比亚比尔' },
      // { code: 'EUR', display: '欧元' },
      { code: 'FJD', display: '斐济元' },
      { code: 'FKP', display: '福克兰群岛镑' },
      // { code: 'GBP', display: '英镑' },
      { code: 'GEL', display: '格鲁吉亚拉里' },
      { code: 'GHS', display: '加纳塞地' },
      { code: 'GIP', display: '直布罗陀镑' },
      { code: 'GMD', display: '冈比亚达拉西' },
      { code: 'GNF', display: '几内亚法郎' },
      { code: 'GTQ', display: '危地马拉格查尔' },
      { code: 'GYD', display: '圭亚那元' },
      // { code: 'HKD', display: '港币' },
      { code: 'HNL', display: '洪都拉斯伦皮拉' },
      { code: 'HRK', display: '克罗地亚库纳' },
      { code: 'HTG', display: '海地古德' },
      { code: 'HUF', display: '匈牙利福林' },
      { code: 'IDR', display: '印度尼西亚卢比' },
      { code: 'ILS', display: '以色列新谢克尔' },
      { code: 'INR', display: '印度卢比' },
      { code: 'IQD', display: '伊拉克第纳尔' },
      { code: 'IRR', display: '伊朗里亚尔' },
      { code: 'ISK', display: '冰岛克朗' },
      { code: 'JMD', display: '牙买加元' },
      { code: 'JOD', display: '约旦第纳尔' },
      // { code: 'JPY', display: '日元' },
      { code: 'KES', display: '肯尼亚先令' },
      { code: 'KGS', display: '吉尔吉斯斯坦索姆' },
      { code: 'KHR', display: '柬埔寨瑞尔' },
      { code: 'KMF', display: '科摩罗法郎' },
      { code: 'KPW', display: '朝鲜元' },
      // { code: 'KRW', display: '韩元' },
      { code: 'KWD', display: '科威特第纳尔' },
      { code: 'KYD', display: '开曼群岛元' },
      { code: 'KZT', display: '哈萨克斯坦坚戈' },
      { code: 'LAK', display: '老挝基普' },
      { code: 'LBP', display: '黎巴嫩镑' },
      { code: 'LKR', display: '斯里兰卡卢比' },
      { code: 'LRD', display: '利比里亚元' },
      { code: 'LSL', display: '莱索托洛蒂' },
      { code: 'LYD', display: '利比亚第纳尔' },
      { code: 'MAD', display: '摩洛哥迪拉姆' },
      { code: 'MDL', display: '摩尔多瓦列伊' },
      { code: 'MGA', display: '马达加斯加阿里亚里' },
      { code: 'MKD', display: '马其顿第纳尔' },
      { code: 'MMK', display: '缅甸元' },
      { code: 'MNT', display: '蒙古图格里克' },
      // { code: 'MOP', display: '澳门元' },
      { code: 'MRU', display: '毛里塔尼亚乌吉亚' },
      { code: 'MUR', display: '毛里求斯卢比' },
      { code: 'MVR', display: '马尔代夫卢菲亚' },
      { code: 'MWK', display: '马拉维克瓦查' },
      { code: 'MXN', display: '墨西哥比索' },
      // { code: 'MYR', display: '马来西亚林吉特' },
      { code: 'MZN', display: '莫桑比克梅蒂卡尔' },
      { code: 'NAD', display: '纳米比亚元' },
      { code: 'NGN', display: '尼日利亚奈拉' },
      { code: 'NIO', display: '尼加拉瓜科多巴' },
      { code: 'NOK', display: '挪威克朗' },
      { code: 'NPR', display: '尼泊尔卢比' },
      // { code: 'NZD', display: '新西兰元' },
      { code: 'OMR', display: '阿曼里亚尔' },
      { code: 'PAB', display: '巴拿马巴波亚' },
      { code: 'PEN', display: '秘鲁索尔' },
      { code: 'PGK', display: '巴布亚新几内亚基那' },
      { code: 'PHP', display: '菲律宾比索' },
      { code: 'PKR', display: '巴基斯坦卢比' },
      { code: 'PLN', display: '波兰兹罗提' },
      { code: 'PYG', display: '巴拉圭瓜拉尼' },
      { code: 'QAR', display: '卡塔尔里亚尔' },
      { code: 'RON', display: '罗马尼亚列伊' },
      { code: 'RSD', display: '塞尔维亚第纳尔' },
      { code: 'RUB', display: '俄罗斯卢布' },
      { code: 'RWF', display: '卢旺达法郎' },
      { code: 'SAR', display: '沙特里亚尔' },
      { code: 'SBD', display: '所罗门群岛元' },
      { code: 'SCR', display: '塞舌尔卢比' },
      { code: 'SDG', display: '苏丹镑' },
      { code: 'SEK', display: '瑞典克朗' },
      // { code: 'SGD', display: '新加坡元' },
      { code: 'SHP', display: '圣赫勒拿镑' },
      { code: 'SLL', display: '塞拉利昂利昂' },
      { code: 'SOS', display: '索马里先令' },
      { code: 'SRD', display: '苏里南元' },
      { code: 'SSP', display: '南苏丹镑' },
      { code: 'STN', display: '圣多美和普林西比多布拉' },
      { code: 'SVC', display: '萨尔瓦多科朗' },
      { code: 'SYP', display: '叙利亚镑' },
      { code: 'SZL', display: '斯威士兰里兰吉尼' },
      // { code: 'THB', display: '泰铢' },
      { code: 'TJS', display: '塔吉克斯坦索莫尼' },
      { code: 'TMT', display: '土库曼斯坦马纳特' },
      { code: 'TND', display: '突尼斯第纳尔' },
      { code: 'TOP', display: '汤加潘加' },
      { code: 'TRY', display: '土耳其里拉' },
      { code: 'TTD', display: '特立尼达和多巴哥元' },
      // { code: 'TWD', display: '新台币' },
      { code: 'TZS', display: '坦桑尼亚先令' },
      { code: 'UAH', display: '乌克兰格里夫纳' },
      { code: 'UGX', display: '乌干达先令' },
      // { code: 'USD', display: '美元' },
      { code: 'UYU', display: '乌拉圭比索' },
      { code: 'UZS', display: '乌兹别克斯坦索姆' },
      { code: 'VES', display: '委内瑞拉玻利瓦尔' },
      { code: 'VND', display: '越南盾' },
      { code: 'VUV', display: '瓦努阿图瓦图' },
      { code: 'WST', display: '萨摩亚塔拉' },
      { code: 'XAF', display: '中非法郎' },
      { code: 'XCD', display: '东加勒比元' },
      { code: 'XOF', display: '西非法郎' },
      { code: 'XPF', display: '太平洋法郎' },
      { code: 'YER', display: '也门里亚尔' },
      { code: 'ZAR', display: '南非兰特' },
      { code: 'ZMW', display: '赞比亚克瓦查' },
      { code: 'ZWL', display: '津巴布韦元' }
    ],
    searchQuery: '',
    searchResults: [],
    selectedCurrency: null,
    showCurrencyPicker: false,
    amount: '',
    notes: '',
    imageUrl: '',
    fileID: '',
    date: '',
    time: '',
    today: '',
    currentTime: '',
    
  },


  onLoad() {
    const now = new Date()
    const currentDate = this.formatDate(now)
    const currentTime = this.formatTime(now)
    
    this.setData({
      date: currentDate,
      time: currentTime,
      today: currentDate,
      currentTime: currentTime,
      selectedCurrency: this.data.topCurrencies[0]
    })
  },

  showCurrencyPicker() {
    this.setData({
      showCurrencyPicker: true,
      searchQuery: '',
      searchResults: []
    })
  },

  hideCurrencyPicker() {
    this.setData({
      showCurrencyPicker: false,
      searchQuery: '',
      searchResults: []
    })
  },

  handleSearch(e) {
    const query = e.detail.value.toUpperCase();
    this.setData({
      searchQuery: query,
      searchResults: query ? this.data.fullCurrencyList.filter(currency => 
        currency.code.includes(query) || 
        currency.display.toUpperCase().includes(query)
      ) : []
    });
  },

  selectSearchResult(e) {
    const { index } = e.currentTarget.dataset;
    const currency = this.data.searchResults[index];
    this.setData({
      selectedCurrency: currency,
      showCurrencyPicker: false,
      searchQuery: '',
      searchResults: []
    });
  },

  selectCurrency(e) {
    const { type, index } = e.currentTarget.dataset
    const currency = type === 'top' ? this.data.topCurrencies[index] : this.data.allCurrencies[index]
    
    this.setData({
      selectedCurrency: currency,
      showCurrencyPicker: false
    })
  },

  bindDateChange(e) {
    const selectedDate = e.detail.value
    let selectedTime = this.data.time

    if (selectedDate === this.data.today && selectedTime > this.data.currentTime) {
      selectedTime = this.data.currentTime
    }

    this.setData({
      date: selectedDate,
      time: selectedTime
    })
  },

  bindTimeChange(e) {
    const selectedTime = e.detail.value
    
    if (this.data.date === this.data.today && selectedTime > this.data.currentTime) {
      wx.showToast({
        title: '不能选择未来时间',
        icon: 'none'
      })
      return
    }

    this.setData({
      time: selectedTime
    })
  },

  handleAmountInput(e) {
    let value = e.detail.value
    const isNoDecimalCurrency = NO_DECIMAL_CURRENCIES.includes(this.data.selectedCurrency.code)
    
    // 对于不使用小数点的货币，直接移除所有非数字字符
    if (isNoDecimalCurrency) {
      value = value.replace(/[^\d]/g, '')
      // 添加千位分隔符
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      // 移除所有非数字和小数点的字符（包括逗号）
      value = value.replace(/[^\d.]/g, '')
      
      // 处理多个小数点的情况
      if ((value.match(/\./g) || []).length > 1) {
        value = value.substr(0, value.lastIndexOf('.'))
      }
      
      // 处理小数位数
      if (value.includes('.')) {
        let [integer, decimal] = value.split('.')
        decimal = decimal.substr(0, 2)
        
        // 给整数部分添加千位分隔符
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        
        value = `${integer}.${decimal}`
      } else {
        // 没有小数点时，直接添加千位分隔符
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }
    
    // 处理以0开头的情况
    if (value.length > 1 && value[0] === '0' && value[1] !== '.' && value[1] !== ',') {
      value = value.replace(/^0+/, '')
    }
    
    this.setData({ amount: value })
  },
  
  handleAmountBlur(e) {
    let value = this.data.amount
    
    if (!value) return
    
    const isNoDecimalCurrency = NO_DECIMAL_CURRENCIES.includes(this.data.selectedCurrency.code)
    
    // 移除所有逗号后处理
    value = value.replace(/,/g, '')
    
    if (!isNoDecimalCurrency) {
      // 处理小数位数
      if (value.includes('.')) {
        let [integer, decimal] = value.split('.')
        // 补齐小数位到2位
        decimal = decimal.padEnd(2, '0')
        // 重新添加千位分隔符
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        value = `${integer}.${decimal}`
      } else {
        // 整数添加.00
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.00'
      }
    } else {
      // 不使用小数点的货币只添加千位分隔符
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    
    this.setData({ amount: value })
  },

  handleNotesInput(e) {
    this.setData({
      notes: e.detail.value
    })
  },

  async handleChooseImage() {
    try {
      const res = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['original'],
        sourceType: ['album', 'camera']
      })
      this.setData({
        imageUrl: res.tempFiles[0].tempFilePath
      })
    } catch (err) {
      console.error('选择图片失败：', err)
    }
  },

  handleDeleteImage() {
    this.setData({
      imageUrl: '',
      fileID: ''
    })
  },

  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  },
  async handleSubmit() {
  const isNoDecimalCurrency = NO_DECIMAL_CURRENCIES.includes(this.data.selectedCurrency.code)
  const amount = this.data.amount.replace(/,/g, '')
  
  if (!amount || (isNoDecimalCurrency ? parseInt(amount) === 0 : parseFloat(amount) === 0)) {
    wx.showToast({
      title: '请输入有效金额',
      icon: 'error',
      duration: 2000
    })
    return
  }

  try {
    wx.showLoading({
      title: '提交中...',
      mask: true
    })

    let fileID = ''
    if (this.data.imageUrl) {
      const cloudPath = `records/${Date.now()}-${Math.random().toString(36).substr(2)}.${this.data.imageUrl.match(/\.([^\.]+)$/)[1]}`
      const uploadRes = await wx.cloud.uploadFile({
        cloudPath,
        filePath: this.data.imageUrl
      })
      fileID = uploadRes.fileID
    }

    const [year, month, day] = this.data.date.split('-')
    const [hours, minutes] = this.data.time.split(':')
    const selectedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    )

    await db.collection('records').add({
      data: {
        currency: this.data.selectedCurrency.code,
        amount: isNoDecimalCurrency ? parseInt(amount) : parseFloat(amount),
        notes: this.data.notes,
        imageUrl: fileID,
        date: selectedDate
      }
    })

      wx.hideLoading()
      wx.showToast({
        title: '记录成功',
        icon: 'success',
        duration: 2000
      })

      this.setData({
        amount: '',
        notes: '',
        imageUrl: '',
        fileID: ''
      })

    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
        icon: 'error',
        duration: 2000
      })
      console.error('提交失败：', err)
    }
  }
})