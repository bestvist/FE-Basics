function extend(child, parent){
    var F = function (){}; // 空函数为中介，减少实例时占用的内存

    F.prototype = parent.prototype; // f继承parent原型

    child.prototype = new F(); // 实例化f，child继承，child、parent原型互不影响

    child.prototype.constructor = child; // child构造函数指会自身，保证继承统一

    child.super = parent.prototype; // 新增属性指向父类，保证子类继承完备
}