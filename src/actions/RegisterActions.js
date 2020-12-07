import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.REGISTER_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.REGISTER_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.REGISTER_SUCCESS,
    data: data
})
