Page({
  onLoad: function (options) {
    this.setData({
      sku:{
        goods: [
          {name:'尺寸', items:['5.5寸', '4.7寸', '6.0寸']},
          {name:'内存', items:['16G', '32G']},
          {name:'颜色', items:['黑色', '红色', '黄色']}
        ],
        skus: [
          {'sku': '5.5寸;16G;红色', 'id':'1'},
          {'sku': '5.5寸;16G;黄色', 'id':'2'},
          {'sku': '5.5寸;32G;红色', 'id':'3'},
          {'sku': '5.5寸;32G;黄色', 'id':'4'},
          {'sku': '4.7寸;16G;红色', 'id':'5'},
          {'sku': '4.7寸;16G;黄色', 'id':'6'},
          {'sku': '4.7寸;32G;黑色', 'id':'7'},
          {'sku': '4.7寸;32G;红色', 'id':'8'},
          {'sku': '6.0寸;16G;黑色', 'id':'9'},
          {'sku': '6.0寸;16G;红色', 'id':'10'},
          {'sku': '6.0寸;16G;黄色', 'id':'11'},
          {'sku': '6.0寸;32G;红色', 'id':'12'},
          {'sku': '6.0寸;32G;黄色', 'id':'13'}
        ],
        default:{'sku': '5.5寸;16G;红色', 'id':'1'},
      }
    })
  },

  handleChange(e) {
    console.log(e.detail)
  },
})