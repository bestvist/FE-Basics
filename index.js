Function.prototype.call2 = function (ctx) {
    if (typeof this !== 'function') {
        throw new Error('Function undefined');
    }

    const fn = ctx.fn;

    ctx.fn = this;

    const args = [...arguments].splice(1);

    const res = ctx.fn(args);

    ctx.fn = fn;

    return res;
}