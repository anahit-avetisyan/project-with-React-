
export function InputValue(value){
return{
    type:"CHANGE_VALUE",
    value
}
}
export function ChangeRate(value){
    return{
        type:"CHANGE_RATE",
        value
    }
}
export function fetchProducts(data) {
    return (dispatch) => {
      dispatch(fetchProductsBegin());
      return fetch('http://books.test/api/register',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(response => {
          dispatch(fetchProductsSuccess(response));
          return response;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }

export function fetchProductsBegin(){
    return{
  type: "FETCH_PRODUCTS_BEGIN"
    }
};

export function  fetchProductsSuccess(user){
    return{
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: { user }
    }
};

export function fetchProductsFailure(error){
    return{
  type: "FETCH_PRODUCTS_FAILURE",
  payload: { error }
    }
};