import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.HOME_SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.HOME_SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.HOME_SERVICE_SUCCESS,
    data: data
})
