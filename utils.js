function getAsUriParameters(data) {
    var url = '';
    for (var prop in data) {
        url += encodeURIComponent(prop) + '=' +
            encodeURIComponent(data[prop]) + '&';
    }
    return url.substring(0, url.length - 1) //removes trailing '&'
}

function arrayBufferToBase64(buffer) {
    return new Promise(function(resolve, reject) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    let base64 = window.btoa(binary);
    resolve(base64);
});
}
function base64toUint8(base64) {
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}
function listProps(obj) {
    for (prop in obj) {
        alert(prop + ":\n" + obj[prop]);
    }
}
//////////////////////////////////error messages///////////////////////////////
    function fail(error) {
        var stack = error.stack;
        var fileLine = error.stack.split("(")[1].split(")")[0].split(":");
        var file = fileLine[0];
        var funct = stack.split(" ")[2];
        var line = fileLine[1];
        var summary = "File: " + file + 
                      "\nFunction: " + funct + 
                      "\nLine: " + line + 
                      "\nMessage: " + error.message;
        alert("An error has occurred.\n\n" + summary);
    }