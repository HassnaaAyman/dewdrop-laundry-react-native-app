import * as Actions from '../actions/ActionTypes'
const AddressListReducer = (state = { isLoding: false, error: undefined, data:[], message:undefined, status:undefined, address_count:undefined }, action) => {
    switch (action.type) {
        case Actions.ADDRESS_LIST_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.ADDRESS_LIST_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.ADDRESS_LIST_SUCCESS:
           if(action.data.status != 1){
               return Object.assign({}, state, {
                isLoding: false,
                status: action.data.status,
                message: action.data.message
               });
            }else{
              return Object.assign({}, state, {
                isLoding: false,
                status: action.data.status,
                message: action.data.message,
                data: action.data.result,
                address_count:action.data.result.length
               });
            }
        case Actions.ADDRESS_DELETE_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.ADDRESS_DELETE_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.ADDRESS_DELETE_SUCCESS:
           if(action.data.status != 1){
               return Object.assign({}, state, {
                isLoding: false,
                status: action.data.status,
                message: action.data.message
               });
            }else{
              return Object.assign({}, state, {
                isLoding: false,
                status: action.data.status,
                message: action.data.message,
                data: action.data.result,
                address_count:action.data.result.length
               });
            }
        default:
            return state;
    }
}

export default AddressListReducer;