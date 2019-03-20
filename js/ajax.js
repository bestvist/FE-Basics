var ajax = {};

ajax.get = function (url, fn) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 403)) {

            fn.call(this, xhr.responseText);

        }
    }
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
}