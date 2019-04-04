
export function InputValue(value){
return{
    type:"CHANGE_VALUE",
    value
}
}
let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})
