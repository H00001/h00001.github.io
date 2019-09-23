function extracted(func, url) {
    var request = new XMLHttpRequest();
    console.log(url);
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            func(eval("(" + request.responseText + ")"));
        }
    };
}

function getList(func, url) {
    extracted(func, url);
}

function getListItemFunc(func, url) {
    getList(function (k) {
        for (let i = 0; i < k.length; i++) {
            func(k[i])
        }
    }, url)
}