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