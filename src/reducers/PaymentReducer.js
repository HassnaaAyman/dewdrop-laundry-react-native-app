import * as Actions from '../actions/ActionTypes'
const PaymentReducer = (state = { isLoding: false, error: undefined, data:undefined, payments:undefined, stripe:undefined, tap_status:undefined, message:undefined, status:undefined }, action) => {
    switch (action.type) {
        case Actions.ORDER_SERVICE_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.ORDER_SERVICE_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.ORDER_SERVICE_SUCCESS: 
            return Object.assign({}, state, {
                isLoding: false,
                data:action.data
            });
        case Actions.PAYMENT_LIST_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.PAYMENT_LIST_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.PAYMENT_LIST_SUCCESS: 
            return Object.assign({}, state, {
                isLoding: false,
                payments:action.data
            });
        case Actions.STRIPE_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.STRIPE_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.STRIPE_SUCCESS: 
            return Object.assign({}, state, {
                isLoding: false,
                stripe:action.data
            });
        case Actions.TAP_STATUS: 
            return Object.assign({}, state, {
                tap_status:action.data
            });
            
           
        default:
            return state;
    }
}

export default PaymentReducer;