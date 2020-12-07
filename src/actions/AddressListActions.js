import * as ActionTypes from './ActionTypes';

export const listServiceActionPending = () => ({
    type: ActionTypes.ADDRESS_LIST_PENDING
})

export const listServiceActionError = (error) => ({
    type: ActionTypes.ADDRESS_LIST_ERROR,
    error: error
})

export const listServiceActionSuccess = (data) => ({
    type: ActionTypes.ADDRESS_LIST_SUCCESS,
    data: data
})

export const deleteServiceActionPending = () => ({
    type: ActionTypes.ADDRESS_DELETE_PENDING
})

export const deleteServiceActionError = (error) => ({
    type: ActionTypes.ADDRESS_DELETE_ERROR,
    error: error
})

export const deleteServiceActionSuccess = (data) => ({
    type: ActionTypes.ADDRESS_DELETE_SUCCESS,
    data: data
})
