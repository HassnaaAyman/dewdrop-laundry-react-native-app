import * as Actions from '../actions/ActionTypes'
const RegisterReducer = (state = { isLoding: false, error: undefined, data:[], message:undefined, status:undefined }, action) => {
    switch (action.type) {
        case Actions.REGISTER_PENDING:
            return Object.assign({}, state, {
               isLoding: true,
            });
        case Actions.REGISTER_ERROR:
            return Object.assign({}, state, {
                isLoding: false,
                error: action.error
            });
        case Actions.REGISTER_SUCCESS:
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
              });
            } 
        default:
            return state;
    }
}

export default RegisterReducer;