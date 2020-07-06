class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  getName() {
    return this.name
  }
}

let xm = new Person('小明', 12)
console.log(xm)
console.log(xm.getName())
