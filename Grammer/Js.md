# JavaScript 面试手撕常用语法

## 类型转换

```js
// 字符串 -> 数字
Number("123")       // 123
parseInt("123")     // 123 (整数)
parseFloat("1.5")   // 1.5
+"123"              // 123 (一元加号)

// 数字 -> 字符串
String(123)         // "123"
(123).toString()    // "123"
123 + ""            // "123"

// 字符 <-> ASCII
"a".charCodeAt(0)   // 97
String.fromCharCode(97) // "a"

// 布尔转换
Boolean(0)          // false (0, "", null, undefined, NaN 都是 false)
!!1                 // true
```

---

## 字符串 String

```js
let s = "hello world";

s.length            // 11 (长度，属性不是方法)

// 访问字符
s[0]                // "h"
s.charAt(0)         // "h"

// 查找
s.indexOf("world")  // 6 (找不到返回 -1)
s.includes("hello") // true
s.startsWith("he")  // true
s.endsWith("ld")    // true

// 截取 (不修改原字符串)
s.slice(0, 5)       // "hello" (start, end 不包含end)
s.slice(-5)         // "world" (支持负索引)
s.substring(0, 5)   // "hello" (同slice，但不支持负数)

// 分割与拼接
s.split(" ")        // ["hello", "world"]
"a,b,c".split(",")  // ["a", "b", "c"]
"abc".split("")     // ["a", "b", "c"]

// 变换
s.toUpperCase()     // "HELLO WORLD"
s.toLowerCase()     // "hello world"
s.trim()            // 去首尾空格
s.replace("hello", "hi")  // "hi world" (只替换第一个)
s.replaceAll("l", "L")    // "heLLo worLd"
s.repeat(2)         // "hello worldhello world"

// 填充
"5".padStart(3, "0")  // "005"
"5".padEnd(3, "0")    // "500"
```

---

## 数组 Array

```js
let arr = [1, 2, 3, 4, 5];

arr.length          // 5

// 增删 (修改原数组)
arr.push(6)         // 尾部添加，返回新长度
arr.pop()           // 尾部删除，返回被删元素
arr.unshift(0)      // 头部添加，返回新长度
arr.shift()         // 头部删除，返回被删元素
arr.splice(1, 2)    // 从索引1删2个，返回被删部分 [2,3]，arr = [1, 4, 5]
arr.splice(1, 0, 99) // 从索引1插入99，不删除，返回[]，原arr被修改为[1, 99, 4, 5]

// 截取 (不修改原数组)
arr.slice(1, 3)     // [2, 3] 不包含end
arr.slice(-2)       // 最后两个元素

// 查找
arr.indexOf(3)      // 2 (找不到返回 -1)
arr.includes(3)     // true
arr.find(x => x > 3)      // 4 (第一个满足条件的元素)
arr.findIndex(x => x > 3) // 3 (第一个满足条件的索引)

// 遍历与变换 (不修改原数组)
arr.map(x => x * 2)       // [2, 4, 6, 8, 10]
arr.filter(x => x > 2)    // [3, 4, 5]
arr.reduce((acc, x) => acc + x, 0) // 15 (求和)
arr.forEach(x => console.log(x))   // 无返回值，纯遍历

// 判断
arr.every(x => x > 0)     // true (全部满足)
arr.some(x => x > 4)      // true (至少一个满足)

// 排序 (修改原数组)
arr.sort((a, b) => a - b)  // 升序
arr.sort((a, b) => b - a)  // 降序
arr.reverse()              // 反转

// 拼接
arr.join(",")       // "1,2,3,4,5"
arr.concat([6, 7])  // [1,2,3,4,5,6,7] (不修改原数组)
[...arr, 6, 7]      // 同上，展开运算符

// 扁平化
[[1,2],[3,4]].flat()       // [1,2,3,4]
[[1,[2]],[3]].flat(Infinity) // [1,2,3] 完全展平

// 创建数组
Array(5).fill(0)           // [0, 0, 0, 0, 0]
Array.from({length: 5}, (_, i) => i) // [0, 1, 2, 3, 4]
Array.from("abc")          // ["a", "b", "c"]
```

---

## Map

```js
let map = new Map();

// 增删改查
map.set("key", "value")   // 添加/修改
map.get("key")            // "value" (不存在返回 undefined)
map.has("key")            // true
map.delete("key")         // 删除
map.clear()               // 清空
map.size                  // 元素个数 (属性)

// 遍历
for (let [k, v] of map) { }
map.forEach((val, key) => { })
map.keys()                // 所有key的迭代器
map.values()              // 所有value的迭代器
map.entries()             // 所有[key, value]的迭代器

// 初始化
let map2 = new Map([["a", 1], ["b", 2]]);
```

---

## Set

```js
let set = new Set();

set.add(1)          // 添加
set.has(1)          // true
set.delete(1)       // 删除
set.clear()         // 清空
set.size            // 元素个数

// 数组去重
[...new Set([1,1,2,3])]  // [1, 2, 3]

// 遍历
for (let val of set) { }
set.forEach(val => { })
```

---

## Object 对象

```js
let obj = {a: 1, b: 2, c: 3};

Object.keys(obj)    // ["a", "b", "c"]
Object.values(obj)  // [1, 2, 3]
Object.entries(obj) // [["a",1], ["b",2], ["c",3]]

// 遍历
for (let key in obj) { }
for (let [k, v] of Object.entries(obj)) { }

// 合并
Object.assign({}, obj, {d: 4})  // {a:1, b:2, c:3, d:4}
{...obj, d: 4}                  // 同上

// 判断key存在
"a" in obj          // true
obj.hasOwnProperty("a") // true
```

---

## 常用数学 Math

```js
Math.max(1, 2, 3)         // 3
Math.min(1, 2, 3)         // 1
Math.max(...arr)          // 数组求最大值
Math.abs(-5)              // 5
Math.floor(1.7)           // 1 (向下取整)
Math.ceil(1.2)            // 2 (向上取整)
Math.round(1.5)           // 2 (四舍五入)
Math.trunc(1.9)           // 1 (截断小数)
Math.pow(2, 3)            // 8
Math.sqrt(9)              // 3
Math.log2(8)              // 3

Infinity                  // 正无穷
-Infinity                 // 负无穷
Number.MAX_SAFE_INTEGER   // 2^53 - 1
Number.MIN_SAFE_INTEGER   // -(2^53 - 1)
```

---

## 栈和队列 (用数组模拟)

```js
// 栈 (后进先出)
let stack = [];
stack.push(1)       // 入栈
stack.pop()         // 出栈
stack[stack.length - 1] // 栈顶 (peek)

// 队列 (先进先出)
let queue = [];
queue.push(1)       // 入队
queue.shift()       // 出队
queue[0]            // 队首 (peek)
```

---

## 解构与展开

```js
// 数组解构
let [a, b, ...rest] = [1, 2, 3, 4]; // a=1, b=2, rest=[3,4]
let [x, , z] = [1, 2, 3];           // x=1, z=3 (跳过)

// 对象解构
let {name, age} = {name: "Tom", age: 20};

// 交换变量
[a, b] = [b, a];

// 展开
let arr2 = [...arr, ...arr]; // 合并数组
let obj2 = {...obj, d: 4};   // 合并对象
```

---

## 常用技巧

```js
// 判断类型
typeof "str"        // "string"
typeof 123          // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" (历史遗留bug)
Array.isArray([])   // true

// 空值处理
val ?? "default"    // val 为 null/undefined 时用默认值
val || "default"    // val 为 falsy 时用默认值

// 深拷贝 (面试常考)
JSON.parse(JSON.stringify(obj)) // 简单版 (不支持函数/循环引用)

// 位运算
n >> 1              // 除以2取整
n << 1              // 乘以2
n & 1               // 判断奇偶 (1奇 0偶)
~~1.9               // 1 (取整，同Math.trunc)
```

---

## 遍历方式汇总

```js
// ===== 数组 Array =====
let arr = [10, 20, 30];

for (let i = 0; i < arr.length; i++) { }          // 经典for，能拿到索引
for (let val of arr) { }                           // for...of，直接拿值
arr.forEach((val, idx) => { })                     // forEach，拿值+索引，不能break

// ===== 字符串 String =====
let s = "abc";

for (let i = 0; i < s.length; i++) { s[i] }       // 经典for
for (let ch of s) { }                              // for...of，逐字符

// ===== Map =====
let map = new Map([["a", 1], ["b", 2]]);

for (let [key, val] of map) { }                    // for...of 解构。！！！ Map 不能用 for...in 遍历！！！
map.forEach((val, key) => { })                     // forEach

// ===== Set =====
let set = new Set([1, 2, 3]);

for (let val of set) { }                           // for...of
set.forEach(val => { })                            // forEach

// ===== Object =====
let obj = {a: 1, b: 2, c: 3};

for (let key in obj) { obj[key] }                  // for...in，遍历key
for (let [k, v] of Object.entries(obj)) { }        // 转entries后 for...of
Object.keys(obj).forEach(key => { })               // keys数组遍历
```

| 类型 | for | for...of | for...in | forEach |
|------|-----|----------|----------|---------|
| Array | ✅ | ✅ | ❌(会遍历原型) | ✅ |
| String | ✅ | ✅ | ❌ | ❌ |
| Map | ❌ | ✅ | ❌ | ✅ |
| Set | ❌ | ✅ | ❌ | ✅ |
| Object | ❌ | ❌(需转换) | ✅ | ❌(需转换) |

> **记忆口诀**：`for...of` 用于可迭代对象（Array/String/Map/Set），`for...in` 专门遍历对象的 key。
