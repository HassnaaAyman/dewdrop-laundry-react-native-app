import * as ActionTypes from './ActionTypes';

export const editServiceActionPending = () => ({
    type: ActionTypes.EDIT_PROFILE_PENDING
})

export const editServiceActionError = (error) => ({
    type: ActionTypes.EDIT_PROFILE_ERROR,
    error: error
})

export const editServiceActionSuccess = (data) => ({
    type: ActionTypes.EDIT_PROFILE_SUCCESS,
    data: data
})

export const updateServiceActionPending = () => ({
    type: ActionTypes.UPDATE_PROFILE_PENDING
})

export const updateServiceActionError = (error) => ({
    type: ActionTypes.UPDATE_PROFILE_ERROR,
    error: error
})

export const updateServiceActionSuccess = (data) => ({
    type: ActionTypes.UPDATE_PROFILE_SUCCESS,
    data: data
})

export const updateProfilePicture = (data) => ({
    type: ActionTypes.UPDATE_PROFILE_PICTURE,
    data: data
})
