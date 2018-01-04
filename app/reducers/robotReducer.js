const initialState = {
    gettingToken: false,
    accessToken: "",
    expirationTime: 0
}

export const robotReducer = function (state = initialState, action) {
    switch (action.type) {
        case "GETTING_ROBOT_TOKEN":
            return Object.assign({}, state, {
                gettingToken: true
            })
        case "SET_ROBOT_TOKEN":
            return Object.assign({}, state, {
                accessToken: action.accessToken,
                expirationTime: action.expirationTime,
                gettingToken: false
            })
        default:
            return state
    }
}