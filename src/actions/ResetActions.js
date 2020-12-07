import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.RESET_SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.RESET_SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.RESET_SERVICE_SUCCESS,
    data: data
})
