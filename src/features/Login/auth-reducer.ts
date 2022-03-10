import {Dispatch} from 'redux'
import {handleServerAppError} from '../../utils/error-utils';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAppStatusAC} from '../../app/app-reducer';

const initialState = {
    isLoggedIn: false
}
const slice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
                state.isLoggedIn = action.payload.value
            }
        }
    }
)

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(setIsLoggedInAC({value: false}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch)
        })
}
