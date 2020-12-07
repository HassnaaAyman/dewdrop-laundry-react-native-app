import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.PRIVACY_SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.PRIVACY_SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.PRIVACY_SERVICE_SUCCESS,
    data: data
})
