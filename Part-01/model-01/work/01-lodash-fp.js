const fp = require('lodash/fp')

// horsepower 马力
// dollar_value 价格
// in_stock 库存

const cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  }, {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  }, {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  }, {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  }, {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  }, {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]

// 1. 利用flowRight 重新实现下面函数
let isLastInStock = function (cars) {
  let last_car = fp.last(cars)
  return fp.prop('in_stock', last_car)
}
console.log(isLastInStock(cars))


let flowfp = fp.flowRight(fp.prop('in_stock') ,fp.last)
console.log(flowfp(cars))



// 2. 使用flowRight fp.prop fp.first 获取第一个car的name

let getFirstCarName = fp.flowRight(fp.prop('name'), fp.first)
console.log(getFirstCarName(cars))


// 3. 使用帮助函数_average 重构 averageDollarValue 使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))

console.log(averageDollarValue(cars))

let getAverageDollar = fp.flowRight(v => v / cars.length ,fp.reduce(fp.add, 0), fp.map(v => v.dollar_value))
console.log(getAverageDollar(cars))


// 4. 使用flowRight 写一个sanitizeNames()函数， 返回一个下划线链接的小写字符串， 把数组中的name转换为这种格式 
// 例： sanitizeNames(["Hello World"])   => ["hello_world"]

let _underscore = fp.replace(/\W+/g, '_')

let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(fp.toLower , _underscore)))
console.log(sanitizeNames(["Hello World", "He llo Wo rld"]))