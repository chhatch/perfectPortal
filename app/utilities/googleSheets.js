import {
    gettingRobotToken,
    getRobotToken
} from "../actions/robotActions.js"
import {
    checkRobotToken
} from "./robotUtilities.js"

export const getCurrentProjects = (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const state = getState();
        let currentProjects = [];
        checkRobotToken(state)
            .then((tokenReady) => {
                if (tokenReady) {
                    return true;
                } else {
                    dispatch(gettingRobotToken());
                    return getRobotToken(getState, dispatch)
                }
            })
            .then(() => {
                const id = "1DYOq_rz9IeLHhyVcCFh-ys2GI20FwTBp9CZo-BmBnwM",
                    range = "",
                    queryParameters = {
                        ranges: "\'Current Jobs\'!B2:X",
                        includeGridData: true
                    };
                let state = getState(),
                    accessToken = state.robot.accessToken;
                console.log("Retrieving projects.");
                getSheetValues(id, range, queryParameters, accessToken)
                .then((response) => {
                    if (!response.ok) {
                        console.log("Unable to retieve data form Google Sheets.")
                    } else {
                        return response.json();
                    }
                    resolve();
                })
                .then((data) => {
                    currentProjects = selectCurrentProjects(data);
                    resolve(currentProjects);
                });
            })
    })
}

const getSheetValues = (id, pathParameters, queryParameters, accessToken) => {
    const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets/",
        apiEndPoint = "",
        url = baseUrl + id + apiEndPoint + encodeURIComponent(pathParameters) + getAsUriParameters(queryParameters),
        headers = {
            "Authorization": "Bearer " + accessToken
        },
        request = new Request(url, {
            method: "GET",
            headers: new Headers(headers)
        });
        return fetch(request);
        
}
//https://sheets.googleapis.com/v4/spreadsheets/1DYOq_rz9IeLHhyVcCFh-ys2GI20FwTBp9CZo-BmBnwM/'Current%20Jobs'!B2%3AB

const selectCurrentProjects = (spreadsheetData) =>{
    const allCellData = spreadsheetData.sheets[0].data[0].rowData,
    red = .7137255,
    green = .84313726,
    blue = .65882355;
    let currentProjects = []
    for (let cellData of allCellData) { 
        if(cellData.values && cellData.values[0].effectiveFormat) {
            const backgroundColors = cellData.values[0].effectiveFormat.backgroundColor,
            cellRed = backgroundColors.red,
            cellGreen = backgroundColors.green,
            cellBlue = backgroundColors.blue;
            if(cellRed === red && cellGreen === green && cellBlue === blue && cellData.values[0].userEnteredValue) {
                const name =cellData.values[0].userEnteredValue.stringValue;
                let folderPath = "";
                if (cellData.values[22] && cellData.values[22].userEnteredValue) {
                    folderPath = cellData.values[22].userEnteredValue.stringValue
                }
                const project = {
                    name: name,
                    folderPath: folderPath
                }
                
                    currentProjects.push(project)
            }
        } else {
            continue;
        }
    }
    return currentProjects;
}

function getAsUriParameters(data) {
    var url = '?';
    for (var prop in data) {
        url += encodeURIComponent(prop) + '=' +
            encodeURIComponent(data[prop]) + '&';
    }
    return url.substring(0, url.length - 1) //removes trailing '&'
}