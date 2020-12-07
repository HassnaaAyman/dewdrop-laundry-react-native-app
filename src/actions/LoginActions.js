import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.LOGIN_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.LOGIN_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    data: data
})
