export const toggleItemInfo = index => {
  return {
    type: 'TOGGLE_ITEM_INFO',
    index
  }
}




export const beginRequest = () => {
    return {
        type: "beginRequest"
    }
}




export const resolveRequest = () => {
    return {
        type: "RESOLVE_REQUESt"
    }
};




export const setInitialState = initialState => {
    return {
        type: "SET_INITIAL_STATE",
        initialState
    }
}




export const setIdToken = idToken => {
    return {
        type: "SET_ID_TOKEN",
        id_token
    }
}





//////////THUNK//////////
export const googleSignIn = parameters => {
    let auth2 = gapi.auth2.getAuthInstance();
    let idToken = auth2.currentUser.get().getAuthResponse().id_token;
    console.log("Login successful!");
    var profile = auth2.currentUser.get().getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
      
    return dispatch => {
        dispatch(initialize(idToken));
    }
}




//////////THUNK//////////
export const requestItems = parameters => {
    return dispatch => {
        dispatch(beginRequest());
        return fetch() ////send request to 
        .then(response => response.json())
        .then(json => dispatch(resolveRequest()))
    }
}




//////////THUNK//////////
export const initialize = (idToken) => {
    const request = new Request("http://splashzones.com/api/items", {
        method: "GET",
        headers: new Headers({"id-token": idToken})
    });
    return dispatch => {
        console.log("Fething..");
        fetch(request)
        .then(response => response.json())
        .then (responseData => {
            let initialState = {
                items: [],
                criteria: ["test", "importantCriteria", "Color", "Material"]
            };
            responseData.forEach(item => {
                initialState.items.push({name: item.name,
                    cost: item.cost,
                    retail: item.cost * 2.431,
                    hidden: true
                });
            });
            dispatch(setInitialState(initialState));
        });
    }
}