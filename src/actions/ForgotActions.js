import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.FORGOT_SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.FORGOT_SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.FORGOT_SERVICE_SUCCESS,
    data: data
})
