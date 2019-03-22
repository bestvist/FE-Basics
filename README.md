# FE-Basics

> 📒 前端基础知识。

-   [技能树](https://www.xmind.net/embed/JzUN/)

-   [HTML](#html)

    -   [基础标签](#基础标签)

-   [CSS](#css)

    -   [选择器](#选择器)

-   [Javascript](#javascript)

    -   [继承实现](#继承实现)
    -   [深拷贝](#深拷贝)
    -   [Ajax](#ajax)
    -   [格式化日期](#格式化日期)
    -   [call 实现](#call实现)
    -   [apply 实现](#apply实现)
    -   [bind 实现](#bind实现)
    -   [instanceof 实现](#instanceof实现)

-   [双向绑定](#双向绑定)

    -   [Object.defineProperty](#object.defineProperty)
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

## 双向绑定
