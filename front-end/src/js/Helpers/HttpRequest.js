const HttpRequest = function (url, method, callback, data, async) {
    let request = new XMLHttpRequest();

    request.withCredentials = true;

    if (typeof(async) === 'undefined') {
        async = true;
    }

    if (typeof(data) === 'undefined') {
        data = null;
    }

    request.open(method, url, async);

    if (async) {
        request.onreadystatechange = function () {
            if (request.readyState == 4){
                callback(JSON.parse(request.responseText));
            }
        };
    }

    request.send(data);

    if (!async) {
        if (request.status === 200) {
            callback(request.responseText);
        }
    }
}

export default HttpRequest;
