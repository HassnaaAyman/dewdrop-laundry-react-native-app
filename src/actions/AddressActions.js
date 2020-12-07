import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.CREATE_ADDRESS_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.CREATE_ADDRESS_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.CREATE_ADDRESS_SUCCESS,
    data: data
})

export const editServiceActionPending = () => ({
    type: ActionTypes.EDIT_ADDRESS_PENDING
})

export const editServiceActionError = (error) => ({
    type: ActionTypes.EDIT_ADDRESS_ERROR,
    error: error
})

export const editServiceActionSuccess = (data) => ({
    type: ActionTypes.EDIT_ADDRESS_SUCCESS,
    data: data
})

export const updateServiceActionPending = () => ({
    type: ActionTypes.UPDATE_ADDRESS_PENDING
})

export const updateServiceActionError = (error) => ({
    type: ActionTypes.UPDATE_ADDRESS_ERROR,
    error: error
})

export const updateServiceActionSuccess = (data) => ({
    type: ActionTypes.UPDATE_ADDRESS_SUCCESS,
    data: data
})
