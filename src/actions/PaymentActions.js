import * as ActionTypes from './ActionTypes';

export const orderServicePending = () => ({
    type: ActionTypes.ORDER_SERVICE_PENDING
})

export const orderServiceError = (error) => ({
    type: ActionTypes.ORDER_SERVICE_ERROR,
    error: error
})

export const orderServiceSuccess = (data) => ({
    type: ActionTypes.ORDER_SERVICE_SUCCESS,
    data: data
})

export const paymentListPending = () => ({
    type: ActionTypes.PAYMENT_LIST_PENDING
})

export const paymentListError = (error) => ({
    type: ActionTypes.PAYMENT_LIST_ERROR,
    error: error
})

export const paymentListSuccess = (data) => ({
    type: ActionTypes.PAYMENT_LIST_SUCCESS,
    data: data
})

export const stripePending = () => ({
    type: ActionTypes.STRIPE_PENDING
})

export const stripeError = (error) => ({
    type: ActionTypes.STRIPE_ERROR,
    error: error
})

export const stripeSuccess = (data) => ({
    type: ActionTypes.STRIPE_SUCCESS,
    data: data
})

export const tapStatus = (data) => ({
    type: ActionTypes.TAP_STATUS,
    data: data
})