import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.PROMO_LIST_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.PROMO_LIST_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.PROMO_LIST_SUCCESS,
    data: data
})

