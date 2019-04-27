# FE-Basics

> 📒 前端基础知识。

-   [技能树](https://www.xmind.net/embed/JzUN/)

-   [HTML](#html)

    -   [基础标签](#基础标签)

-   [CSS](#css)

    -   [选择器](#选择器)
    -   [文本溢出](#文本溢出)

-   [Javascript](#javascript)

    -   [继承实现](#继承实现)
    -   [深拷贝](#深拷贝)
    -   [Ajax](#ajax)
    -   [格式化日期](#格式化日期)
    -   [call 实现](#call-实现)
    -   [apply 实现](#apply-实现)
    -   [bind 实现](#bind-实现)
    -   [instanceof 实现](#instanceof-实现)
    -   [Promise 实现](#promise-实现)

-   [双向绑定](#双向绑定)

    -   [Object.defineProperty](#objectdefineproperty)
    -   [Proxy](#proxy)

## HTML

#### 基础标签

```html
<head></head>

<meta />

<link rel="stylesheet" href="" />

<title></title>

<body></body>

<center></center>

<section></section>

<article></article>

<aside></aside>

<div></div>

<ul></ul>

<li></li>

<p></p>

<h1></h1>
~
<h6></h6>

<button></button>

<input type="text" />

<a href=""></a>

<span></span>

<strong></strong>

<i></i>
```

## CSS

#### 选择器

```css
/* 选择所有元素 */
* {
}

/* 选择 div 元素 */
div {
}

/* 选择类名元素 */
.class {
}

/* 选择 id 元素 */
#id {
}

/* 选择 div 元素内的所有 p 元素 */
div p {
}

/* 选择 div 元素内下一层级的 p 元素 */
div > p {
}
```

#### 文本溢出

```css
// 文本溢出单行显示
.single {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

// 文本溢出多行显示
.multiple {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

## Javascript

#### 继承实现

```js
function extend(child, parent) {
    var F = function() {}; // 空函数为中介，减少实例时占用的内存

    F.prototype = parent.prototype; // f继承parent原型

    child.prototype = new F(); // 实例化f，child继承，child、parent原型互不影响

    child.prototype.constructor = child; // child构造函数指会自身，保证继承统一

    child.super = parent.prototype; // 新增属性指向父类，保证子类继承完备
}
```

#### 深拷贝

```js
function deepCopy(s, t) {
    t = t || (Object.prototype.toString.call(t) === "[object Array]" ? [] : {});

    for (var i in s) {
        if (typeof s[i] === "object") {
            t[i] = deepCopy(s[i], t[i]);
        } else {
            t[i] = s[i];
        }
    }

    return t;
}
```

#### Ajax

```js
var ajax = {};

ajax.get = function(url, fn) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (
            xhr.readyState === 4 &&
            (xhr.status === 200 || xhr.status === 403)
        ) {
            fn.call(this, xhr.responseText);
        }
    };

    xhr.send();
};

ajax.post = function(url, data, fn) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (
            xhr.readyState === 4 &&
            (xhr.status === 200 || xhr.status === 403)
        ) {
            fn.call(this, xhr.responseText);
        }
    };

    xhr.send(data);
};
```

#### 格式化日期

```js
function formatDate(date, format) {
    if (arguments.length === 0) return null;

    format = format || "{y}-{m}-{d} {h}:{i}:{s}";

    if (typeof date !== "object") {
        if ((date + "").length === 10) date = parseInt(date) * 1000;
        date = new Date(date);
    }

    const dateObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };

    const dayArr = ["一", "二", "三", "四", "五", "六", "日"];

    const str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (match, key) => {
        let value = dateObj[key];

        if (key === "a") return dayArr[value - 1];

        if (value < 10) {
            value = "0" + value;
        }

        return value || 0;
    });

    return str;
}
```

#### call 实现

```js
Function.prototype.callfb = function (ctx) {
    if (typeof this !== 'function') {
        throw new Error('Function undefined');
    }

    ctx = ctx || window;

    const fn = ctx.fn;

    ctx.fn = this;

    const args = [...arguments].slice(1);

    const res = ctx.fn(args);

    ctx.fn = fn;

    return res;
}
```

#### apply 实现

```js
Function.prototype.applyFb = function (ctx) {
    if (typeof this !== 'function') {
        throw new Error('Function undefined');
    }

    ctx = ctx || window;

    const fn = ctx.fn;

    ctx.fn = this;

    const arg = arguments[1];

    const res = Array.isArray(arg) ? ctx.fn(...arg) : ctx.fn();

    ctx.fn = fn;

    return res;
}
```

#### bind 实现

```js
Function.prototype.bindFb = function (ctx) {

    const fn = this;

    const args = [...arguments].slice(1);

    const F = function () {};

    const fBind = function () {
        return fn.apply(this instanceof fBind ? this : ctx, args.concat(...arguments))
    }

    if (fn.prototype) {
        F.prototype = fn.prototype;
    }

    fBind.prototype = new F();

    return fBind;
}
```

#### instanceof 实现

```js
function instanceofFb(left, right) {
    let proto, prototype = right.prototype;

    proto = left.__proto__;

    while (proto) {

        if (proto === prototype) {
            return true;
        }

        proto = proto.__proto__;

    }

    return false;
}
```

#### Promise 实现

```js
function promiseFb(fn) {
    const _this = this;
    this.state = 'pending'; // 初始状态为pending
    this.value = null;
    this.resolvedCallbacks = []; // 这两个变量用于保存then中的回调，因为执行完Promise时状态可能还是pending
    this.rejectedCallbacks = []; // 此时需要吧then中的回调保存起来方便状态改变时调用

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.state = 'resolved';
            _this.value = value;
            _this.resolvedCallbacks.map(cb => { cb(value) }); // 遍历数组，执行之前保存的then的回调函数
        }
    }

    function reject(value) {
        if (_this.state === 'pending') {
            _this.state = 'rejected';
            _this.value = value;
            _this.rejectedCallbacks.map(cb => { cb(value) });
        }
    }

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

promiseFb.prototype.then = function (onFulfilled, onRejected) {
    // 因为then的两个参数均为可选参数，
    // 所以判断参数类型本身是否为函数，如果不是，则需要给一个默认函数如下（方便then不传参数时可以透传）
    // 类似这样： Promise.resolve(4).then().then((value) => console.log(value))
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : fn => fn;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

    switch (this.state) {
        case 'pending':
            // 若执行then时仍为pending状态时，添加函数到对应的函数数组
            this.resolvedCallbacks.push(onFulfilled);
            this.rejectedCallbacks.push(onRejected);
            break;
        case 'resolved':
            onFulfilled(this.value);
            break;
        case 'rejected':
            onRejected(this.value);
            break;
        default: break;
    }
}
```

## 双向绑定

**双向绑定**：视图（View）的变化能实时让数据模型（Model）发生变化，而数据的变化也能实时更新到视图层.

![mvvm](/images/mvvm.jpg)

#### Object.defineProperty

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>mvvm</title>
</head>
<body>
    <p>数据值：<span id="data"></span></p>
    <p><input type="text" onkeyup="keyup()"></p>
    <script>
        var obj = {
            data: ''
        }

        function keyup(e) {
            e = e || window.event;
            obj.data = e.target.value; // 更新数据值
        }

        Object.defineProperty(obj, 'data', {
            get: function () {
                return this.data;
            },
            set: function (newVal) {
                document.getElementById('data').innerText = newVal; // 更新视图值
            }
        })
    </script>
</body>
</html>
```

#### Proxy

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>mvvm</title>
</head>
<body>
    <p>数据值：<span id="data"></span></p>
    <p><input type="text" onkeyup="keyup()"></p>
    <script>
        var obj = new Proxy({}, {
            get: function (target, key, receiver) {
                return Reflect.get(target, key, receiver);
            },
            set: function (target, key, value, receiver) {
                if (key === 'data') {
                    document.getElementById('data').innerText = value; // 更新视图值
                }
                return Reflect.set(target, key, value, receiver);
            }
        })

        function keyup(e) {
            e = e || window.event;
            obj.data = e.target.value; // 更新数据值
        }
    </script>
</body>
</html>
```