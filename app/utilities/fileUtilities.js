export const fileReader = (file) => {
    return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = function() {
            var arrayBuffer = this.result;
            let data = new Uint8Array(arrayBuffer)
            resolve(data);
        };
        reader.onerror = function() {
            reject(this.error);
        };
        reader.readAsArrayBuffer(file);
    });
}