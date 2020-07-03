// 把一个字符串的首字符提取并且转换成大写 使用. 分割
// world wild web  => W. W. W

const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

console.log(firstLetterToUpper('world wild web'))
