import { combineReducers} from 'redux';

    function booksInfoBasket(state ={}, action) {
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
            case  "FETCH_PRODUCTS_BEGIN":
                return initialState;
            case "FETCH_PRODUCTS_SUCCESS":       
                return {...state, 
                posts: action.payload};
            case "LOG_OUT":
            return initialState;
            default:
            return state;
        }
    }

    const reducer = combineReducers({booksInfoBasket,userReduser,paginationPage});
      
      export default reducer;