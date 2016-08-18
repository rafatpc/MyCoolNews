const HttpData = function (dataObject) {
    let data = new FormData();

    for (var key in dataObject) {
        data.append(key, dataObject[key]);
    }

    return data;
}

export default HttpData;
