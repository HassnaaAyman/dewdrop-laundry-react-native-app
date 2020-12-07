import * as Actions from '../actions/ActionTypes'
const ProductReducer = (state = { cart_count:undefined, cart_items:[], isLoding: false, error: undefined, data:undefined, message:undefined, status:undefined }, action) => {
    switch (action.type) {
        case Actions.PRODUCT_LIST_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.PRODUCT_LIST_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.PRODUCT_LIST_SUCCESS:
            if(action.data.status != 1){
               return Object.assign({}, state, {
                isLoding: false,
                status: action.data.status,
                message: action.data.message
               });
            }else{
              if(action.data.result.length == 0){
                action.data.result = 0;
              }
              return Object.assign({}, state, {
                isLoding: false,
                status: action.data.status,
                message: action.data.message,
                data: action.data.result,
              });
            }
        case Actions.ADD_TO_CART:
            return Object.assign({}, state, {
               cart_items: action.data,
               cart_count : Object.keys(action.data).length
            });
        case Actions.PRODUCT_RESET:
            return Object.assign({}, state, {
               cart_items: [],
               cart_count : undefined
            });
        case Actions.PRODUCT_LIST_RESET:
            return Object.assign({}, state, {
               data:undefined
            });
        default:
            return state;
    }
}

export default ProductReducer;
