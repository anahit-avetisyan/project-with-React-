

    export function BooksInformation(value){
        return{
            type:"CHANGE_VALUE",
            value
        }
    };
    
    export function request(url , method="GET" , data={} , header={}) {
        return (dispatch) => {  
            return fetch(url,{
                method: method,
                headers: {"Content-Type": "application/json",header},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(response => {
                    dispatch(requestSuccess(response));
                })
                .catch(error => dispatch(requestFailure(error)));
        };
         
    };

    export function requestSuccess(user){
        return{
            type: "FETCH_REQUEST_SUCCESS",
            payload: user
        }
    };

    export function requestFailure(error){
        return{
            type: "FETCH_REQUEST_FAILURE",
            payload: error 
        }
    };
    export function logOut(){
        return{
            type:"LOG_OUT",
          
        }
    };
    export function ChangePage(page){
        return{
            type:"CHANGE_PAGE",
            page
        }
    };