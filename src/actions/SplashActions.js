import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.SETTING_SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.SETTING_SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.SETTING_SERVICE_SUCCESS,
    data: data
})
