Function.prototype.applyfb = function (ctx) {
    if (typeof this !== 'function') {
        throw new Error('Function undefined');
    }

    const fn = ctx.fn;

    ctx.fn = this;

    const arg = arguments[1];

    const res = Array.isArray(arg) ? ctx.fn(...arg) : ctx.fn();

    ctx.fn = fn;

    return res;
}

Function.prototype.bindfb = function (ctx) {

    const fn = this;

    const args = [...arguments].slice(1);

    const F = function () { };

    const fBind = function () {
        return fn.apply(this instanceof fBind ? this : ctx, args.concat(...arguments))
    }

    if (fn.prototype) {
        F.prototype = fn.prototype;
        fBind.prototype = new F();
    }

    return fBind;
}

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

function promiseFb(fn) {
    const _this = this;
    this.state = 'pending';
    this.value = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.state = 'resolved';
            _this.value = value;
            _this.resolvedCallbacks.map(cb => { cb(value) });
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : fn => fn;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

    switch (this.state) {
        case 'pending':
            this.resolvedCallbacks.push(onFulfilled);
            this.rejectedCallbacks.push(onRejected);
            break;
        case 'resolve':
            onFulfilled(this.value);
            break;
        case 'reject':
            onRejected(this.value);
            break;
        default: break;
    }
}