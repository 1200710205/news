let goodsList = {}

goodsList.getGoods = function () {
  return JSON.parse(localStorage.getItem('goodslist') || '{}')
}

goodsList.saveGoods = function (obj) {
  localStorage.setItem('goodslist', JSON.stringify(obj))
}

goodsList.setGoods = function (good) {
  var obj = this.getGoods()
  if (obj[good.id]) {
    obj[good.id] += good.num
  } else {
    obj[good.id] = good.num
  }
  goodsList.saveGoods(obj)
}

goodsList.totalNum = function () {
  var goods = this.getGoods()
  // 获取对象所有key值组成的数组
  var values = Object.values(goods)
  var sum = 0
  values.forEach(item => {
    sum += item
  })
  return sum
}

export default goodsList
