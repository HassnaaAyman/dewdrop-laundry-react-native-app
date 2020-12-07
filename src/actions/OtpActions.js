import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.OTP_SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.OTP_SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.OTP_SERVICE_SUCCESS,
    data: data
})
