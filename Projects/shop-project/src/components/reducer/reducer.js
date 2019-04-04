import { combineReducers} from 'redux';

function changeQuantityApple(state ="0", action) {
        switch (action.type){
            case "CHANGE_VALUE":
            return action.value
            default :
            return state 
        }
    };
    function todos (state = [], action){
      switch (action.type) {
        case 'ADD_TODO':
          return [
            ...state,
            {
              id: action.id,
              text: action.text,
              completed: false
            }
          ]
        case 'TOGGLE_TODO':
          return state.map(todo =>
            todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
          )
        default:
          return state
      }
    }
    const reducer = combineReducers({changeQuantityApple,todos});
      
      export default reducer;