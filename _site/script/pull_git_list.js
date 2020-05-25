function extracted(func, url, isToObj, error) {
    requestData(function (data) {
        if (isToObj === true || isToObj === undefined) {
            func(eval("(" + data + ")"));
        } else {
            func(data)
        }
    }, url, error === undefined ? function (err) {
        (function f(e) {
            console.log("error has been caught at last layer");
            console.log(e)
        })(err)
    } : error);
}

function requestData(func, url, error) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            try {
                func(request.responseText)
            } catch (e) {
                error(e)
            }
        }
    };
}

function getList(func, url) {
    extracted(func, url);
}

function getListItemFunc(func, url) {
    getList(function (k) {
        for (let i = 0; i < k.length; i++) {
            func(k[i], i)
        }
    }, url)
}
