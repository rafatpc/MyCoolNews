import HttpData from "../Helpers/HttpData";

function formatParams(data) {
    return '?' + Object.keys(data).map((key) => {
        return key + '=' + data[key];
    }).join('&');
}

const HttpRequest = function (url, method, callback, data, async) {
    let request = new XMLHttpRequest();

    request.withCredentials = true;

    if (typeof(async) === 'undefined') {
        async = true;
    }

    if (typeof(data) === 'undefined') {
        data = null;
    }

    if (data !== null && method === 'GET') {
        url = url + formatParams(data);
        data = null;
    }

    if (data !== null && method === 'POST') {
        data = HttpData(data);
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
