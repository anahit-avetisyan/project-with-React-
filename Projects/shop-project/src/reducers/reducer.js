import { combineReducers } from 'redux';

    function booksInformation(state ={}, action) {
        switch (action.type){
            case "CHANGE_VALUE":
            return action.value
            default :
            return state 
        }
    };
    function paginationPage(state=1,action){
        switch (action.type) {
            case "CHANGE_PAGE":
            return action.page  
            default:
            return state;
        }   
    };
     
    const initialState = {}
    function userReduser(state=initialState,action){
        switch (action.type) {
            case "FETCH_REQUEST_SUCCESS":       
                return {...state, 
                user: action.payload};
            case "LOG_OUT":
                return initialState;
            default:
            return state;
        }
    }

    const reducer = combineReducers({booksInformation,userReduser,paginationPage});
      
    export default reducer;