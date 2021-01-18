const xhr = new XMLHttpRequest();

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