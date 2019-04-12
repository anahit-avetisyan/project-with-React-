import { combineReducers} from 'redux';

    function changeQuantityApple(state =1, action) {
            switch (action.type){
                case "CHANGE_VALUE":
                return action.value
                default :
                return state 
            }
        };
    function ratingProduct(state=3,action){
            switch (action.type) {
                case "CHANGE_RATE":
                return action.value  
                default:
                return state;
        }
    }
    const initialState = {}
    function userReduser(state=initialState,action){
        switch (action.type) {
            case  "FETCH_PRODUCTS_BEGIN":
                return initialState;
            case "FETCH_PRODUCTS_SUCCESS":       
                return {...state, 
                posts: action.payload};
            // case "LOG_OUT":
            // return initialState;
            default:
            return state;
        }
    }

    const reducer = combineReducers({changeQuantityApple,ratingProduct,userReduser});
      
      export default reducer;