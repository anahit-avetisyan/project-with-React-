import { combineReducers} from 'redux';

function changeQuantityApple(state ="", action) {
        switch (action.type){
            case "CHANGE_VALUE":
            return action.value
            default :
            return state 
        }
    };
  
    const reducer = combineReducers({changeQuantityApple,});
      
      export default reducer;