function extracted(func, url, isToObj, error) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            try {
                if (isToObj === true || isToObj === undefined) {
                    func(eval("(" + request.responseText + ")"));
                } else {
                    func(request.responseText)
                }
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

