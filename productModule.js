var _makeRequest = function(method, url, headers, body, queries, download) {
        return new Promise(function(resolve, reject) {
            if (headers["Content-Type"] === "application/json") {
                body = JSON.stringify(body);
            } else if (headers["Content-Type"] !== "application/octet-stream" && headers["Content-Type"] !== "message/rfc822") {
                body = getAsUriParameters(body || {});
            }
            headers = headers || {};
            queries = queries || {};
            var request = new XMLHttpRequest();
            url += url[url.length - 1] == "?" ? "" : "?";
            for (let query in queries) {
                url += encodeURIComponent(query) + "=" + encodeURIComponent(queries[query]) + "&";
            }
            request.open(method, url);
            for (header in headers || {}) {
                request.setRequestHeader(header, headers[header]);
            }
            request.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(request);
                } else {
                    reject(request);
                }
            };
            request.onerror = function() {
                reject(request);
            };
            if (download) {
                request.responseType = "arraybuffer";
            }
            request.send(body);
        });
    }
    
function onSignIn() {
   var auth2 = gapi.auth2.getAuthInstance();
   //gapi = "";
   let id_token = auth2.currentUser.get().getAuthResponse().id_token;
   if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
} else {
    alert("failed." + auth2.isSignedIn.get());
}
    //_makeRequest("POST", "http://splashzones.com/api/items", {"id-token": id_token, "Content-Type": "application/json"}, {name: "test", cost: 1337, sketchup_id: "tester"} , "", "")
    let method = "GET",
        url = "http://splashzones.com/api/items",
        headers = {"id-token": id_token,
                   "Content-Type": "application/json"},
        body = {
            //name: "myItem4",
            //cost: 1,
            //primary_tag: 2
        }, 
        queries = {
            name: "myItem3",
            tag: 3
        },
        download = false;
   /*_makeRequest(method, url, headers, body, queries , download)
    .then(function(request) {
        alert(request.response);
    }).
   catch(function(request) {
        alert(request.response);
    });*/
}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}