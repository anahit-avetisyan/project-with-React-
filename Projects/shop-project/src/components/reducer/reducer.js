import { combineReducers} from 'redux';

    function changeQuantityApple(state ="", action) {
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
    function userReduser(state={},action){
        switch (action.type) {
            case  "FETCH_PRODUCTS_BEGIN":
                return state;
            case "FETCH_PRODUCTS_SUCCESS":       
                return {...state, 
                posts: action.payload};
            default:
            return state;
        }
    }
    const reducer = combineReducers({changeQuantityApple,ratingProduct,userReduser});
      
      export default reducer;