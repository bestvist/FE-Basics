# FE-Basics

> 前端基础知识。

-   [技能树](https://www.xmind.net/embed/JzUN/)

-   [HTML](#html)

    -   [基础标签](#基础标签)

-   [CSS](#css)

    -   [选择器](#选择器)

-   [Javascript](#javascript)
    -   [继承实现](#继承实现)
    -   [深拷贝](#深拷贝)
    -   [Ajax](#ajax)

## HTML

<details>
<summary>基础标签</summary>

```
<head></head>

<meta>

<link rel="stylesheet" href="">

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

<h1></h1>~<h6></h6>

<button></button>

<input type="text">

<a href=""></a>

<span></span>

<strong></strong>

<i></i>
```

</details>

## CSS

<details>
<summary>选择器</summary>

```

/_ 选择所有元素 _/

-   {}

/_ 选择 div 元素 _/
div {}

/_ 选择类名元素 _/
.class {}

/_ 选择 id 元素 _/
#id {}

/_ 选择 div 元素内的所有 p 元素 _/
div p {}

/_ 选择 div 元素内下一层级的 p 元素 _/
div>p {}

```

</details>

## Javascript

<details>
<summary>继承实现</summary>

```

function extend(child, parent){
var F = function (){}; // 空函数为中介，减少实例时占用的内存

    F.prototype = parent.prototype; // f继承parent原型

    child.prototype = new F(); // 实例化f，child继承，child、parent原型互不影响

    child.prototype.constructor = child; // child构造函数指会自身，保证继承统一

    child.super = parent.prototype; // 新增属性指向父类，保证子类继承完备

}

```

</details>

<details>
<summary>深拷贝</summary>

```

function deepCopy(s, t) {
t = t || (Object.prototype.toString.call(t) === '[object Array]' ? [] : {});

    for (var i in s) {

        if (typeof s[i] === 'object') {
            t[i] = deepCopy(s[i], t[i]);
        } else {
            t[i] = s[i];
        }

    }

    return t;

}

```

</details>

<details>
<summary>Ajax</summary>

```

var ajax = {};

ajax.get = function (url, fn) {
var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 403)) {

            fn.call(this, xhr.responseText);

        }
    }

    xhr.send();

}

ajax.post = function (url, data, fn) {
var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 403)) {
            fn.call(this, xhr.responseText);
        }
    }

    xhr.send(data);

}

```

</details>

