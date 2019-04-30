
    export function BooksInformation(value){
        return{
            type:"CHANGE_VALUE",
            value
        }
    };
    export function fetchProducts(url,method="GET",data="",header="") {
        return (dispatch) => {
            dispatch(fetchProductsBegin());
            return fetch(url,{
                method: method,
                headers: {"Content-Type": "application/json",header},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(response => {
                dispatch(fetchProductsSuccess(response));
                    return response;
                })
                .catch(error => dispatch(fetchProductsFailure(error)));
        };
    };

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
    export function LogOut(value){
        return {
            type:"LOG_OUT",
            value
        }
    };
    export function ChangePage(page){
        return{
            type:"CHANGE_PAGE",
            page
        }
    };