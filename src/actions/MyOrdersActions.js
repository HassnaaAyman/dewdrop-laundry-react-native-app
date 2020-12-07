import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.MYORDERS_LIST_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.MYORDERS_LIST_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.MYORDERS_LIST_SUCCESS,
    data: data
})

export const filterType = (data) => ({
    type: ActionTypes.FILTER_TYPE,
    data: data
})

