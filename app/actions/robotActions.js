//////////THUNK//////////
export const getRobotToken = (getState, dispatch) => {
    return new Promise(function(resolve, reject) {
        const url = "https://www.googleapis.com/oauth2/v4/token",
            body = getAsUriParameters({
                client_id: "523250800726-ubrqf8m3e0fmkph8himkn2pml2vvobd4.apps.googleusercontent.com",
                client_secret: "WdgyIDW4-r9qOjyAeLVePR8J",
                refresh_token: "1/LYRfWSpwIPiuv5ue8DykTo0dBNSLX2U6s0bWDjpiB0FXbFOBYJ-WM998GCowIOZS",
                grant_type: "refresh_token"
            }),
            headers = {
                "Content-type": "application/x-www-form-urlencoded"
            };
            
        const request = new Request(url, {
            method: "POST",
            headers: new Headers(headers),
            body: body
        });
        let responseOk = false;
        fetch(request)
        .then(response => {
            responseOk = response.ok;
        return response.json()})
        .then (responseData => {
            if (responseOk) {
                let accessToken = responseData.access_token,
                    //subtract a minute for just a little padding
                    expirationTime = Math.floor(Date.now() / 1000) + responseData.expires_in - 60;
                dispatch(setRobotToken(accessToken, expirationTime));
                resolve();
            } else {
                console.log("Unable to retrieve robot access token.\n" + responseData);
                reject();
            }
        });
    });
}

export const gettingRobotToken = () => {
    return {
        type:"GETTING_ROBOT_TOKEN"
    }
}

const setRobotToken = (accessToken, expirationTime) => {
    return {
        type: "SET_ROBOT_TOKEN",
        accessToken: accessToken,
        expirationTime: expirationTime
    }
}

function getAsUriParameters(data) {
    var url = '';
    for (var prop in data) {
        url += encodeURIComponent(prop) + '=' +
            encodeURIComponent(data[prop]) + '&';
    }
    return url.substring(0, url.length - 1) //removes trailing '&'
}