const xhr = new XMLHttpRequest();
const nativeToString = Object.prototype.toString;

export function _get(url, callback, contentType = "application/json") {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr && xhr.responseText);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.send();
}

export function _post(url, data, callback, contentType = "application/json") {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr && xhr.responseText);
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.send(data);
}

export function isObject(obj) {
    return nativeToString.call(obj) === '[object Object]';
}

export function isString(str) {
    return nativeToString.call(str).slice(8, -1) === "String";
}

function _extends() {
    _extends = Object.assign || function (target) {
        for (let i = 1; i < arguments.length; i++) {
            let source = arguments[i];

            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends.apply(this, arguments);
}

export function assign(target) {
    for (let _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
    }

    return _extends.apply(void 0, [ target ].concat(others));
}