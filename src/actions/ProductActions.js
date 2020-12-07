import * as ActionTypes from './ActionTypes';

export const serviceActionPending = () => ({
    type: ActionTypes.PRODUCT_LIST_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.PRODUCT_LIST_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.PRODUCT_LIST_SUCCESS,
    data: data
})

export const addToCart = (data) => ({
    type: ActionTypes.ADD_TO_CART,
    data: data
})

export const productReset = () => ({
    type: ActionTypes.PRODUCT_RESET,
})

export const productListReset = () => ({
    type: ActionTypes.PRODUCT_LIST_RESET,
})


