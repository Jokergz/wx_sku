// components/sku.js
Component({
  properties: {
    sku: {
      type: Object,
      value: () => ({
        goods: [],
        skus: [],
        default:{},
      }),
      observer: 'watchSku'
    }
  },

  data: {
    skuState: {},
    select:[],
  },

  methods: {
    watchSku(sku) {
      if (!sku) return

      this.data.skuState = {}
      this.data.select = []

      let goods = sku.goods

      if (sku.default) {
        let skuValue = sku.default.sku.split(';')
        for (let x = 0; x < skuValue.length; x++) {
          this.data.select.push(skuValue[x])
        }
      } else {
        for (let x = 0; x < goods.length; x++) {
          this.data.select.push('')
        }
      }

      for (let x = 0; x < goods.length; x++) {
        for (let y = 0; y < goods[x]['items'].length; y++) {
          this.cell(x, y)
        }
      }
    },
    cell(x, y) {
      let item = this.data.sku.goods[x]['items'][y]
      let trySelect = []
      for (let i = 0; i < this.data.select.length; i++) {
        if (x == i) {
          trySelect.push(item)
        } else {
          if (this.data.select[i] != '') {
            trySelect.push(this.data.select[i])
          } else {
            trySelect.push("")
          }
        }
      }

      let isActive = false
      let skus = this.data.sku.skus
      for (let i = 0; i < skus.length; i++) {
        let sku = skus[i]['sku']

        let skuValue = sku.split(';')
        let isTrySelectIn = false
        for (let j = 0; j < skuValue.length; j++) {
          if (skuValue[j] == trySelect[j] || trySelect[j] == '') {
            isTrySelectIn = true
          } else {
            isTrySelectIn = false
            break
          }
        }

        if (isTrySelectIn) {
          isActive = true
        }

        if (isTrySelectIn) {
          break
        }
      }

      let isSelect = false
      if (this.data.select[x] == item) {
        isSelect = true
      }
      let value = 0
      if (isSelect) {
        value = 2
      } else if (isActive) {
        value = 1
      }
      this.data.skuState[x+'-'+y] = value
      this.setData({
        skuState : this.data.skuState
      })
    },

    handleClick(e) {
      let x = e.target.dataset.x
      let y = e.target.dataset.y
      
      if (this.data.skuState[x+'-'+y] == 0) return

      if (this.data.skuState[x+'-'+y] == 2) return

      let item = this.data.sku.goods[x]['items'][y]
      if (this.data.select[x] == item) {
        this.data.select[x] = ''
      } else {
        this.data.select[x] = item
      }

      for (let x = 0; x < this.data.sku.goods.length; x++) {
        for (let y = 0; y < this.data.sku.goods[x]['items'].length; y++) {
          this.cell(x, y)
        }
      }

      let key = this.data.select.join(';')
      let skus = this.data.sku.skus
      let sku;
      for (let i = 0; i < skus.length; i++) {
        if (skus[i]['sku'] == key) {
          sku = skus[i]
          break
        }
      }
      this.triggerEvent('onChange', sku)
    }
  },
})
