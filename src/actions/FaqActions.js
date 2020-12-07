import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.FAQ_LIST_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.FAQ_LIST_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.FAQ_LIST_SUCCESS,
    data: data
})
