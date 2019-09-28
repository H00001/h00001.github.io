function addProtoChain(base) {
    base.__proto__.html = new function (html) {
        if (html !== undefined) {
            base.innerHTML = html;
        } else {
            return base.innerHTML;
        }
    };


    base.__proto__.appendHtml = function (html) {
        if (html !== undefined) {
            base.innerHTML += html;
        } else {
            return base.innerHTML;
        }
    };
}

function $$(varin) {
    if (varin.startsWith("#")) {
        const base = document.getElementById(varin.substring(1, varin.length));
        addProtoChain(base);
        return base;
    }
}