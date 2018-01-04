//home
export const setInitialHomeFlag = () => {
    return {
        type: "SET_INITIAL_HOME_FLAG"
    }
}

export const unsetInitialHomeFlag = () => {
    return {
        type: "UNSET_INITIAL_HOME_FLAG"
    }
}

export const initializeHomeApp = () => {
    console.log("Let the initialization begin!!")
    return (dispatch) => {
        dispatch(unsetInitialHomeFlag());
    }
}