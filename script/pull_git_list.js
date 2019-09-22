function getList(func) {
    var request = new XMLHttpRequest();
    request.open("GET", "./script/gitlist.json", true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            func(eval("(" + request.responseText + ")"));
        }
    };
}

function getListItemFunc(func) {
    getList(function (k) {
        for (let i = 0; i < k.length; i++) {
            func(k[i])
        }
    })
}