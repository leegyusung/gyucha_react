import { createAction, handleActions } from 'redux-actions'
import produce from 'immer';
import * as authCtrl from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INIT_FORM = 'auth/INIT_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';


export const change_field = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
    form,
    key,
    value
}));

export const init_form = createAction(INIT_FORM);

export const register = ({ username, password }) => async dispatch => {
    dispatch({
        type: REGISTER
    })
    try {
        const result = await authCtrl.register({ username, password });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error
        })
    }
}

export const login = ({ username, password }) => async dispatch => {
    dispatch({
        type: LOGIN
    })
    try {
        const result = await authCtrl.login({ username, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error
        })
    }
}

const initialState = {
    login: {
        username: '',
        password: ''
    },
    register: {
        username: '',
        password: '',
        passwordConfirm: ''
    },
    loading: false,
    auth: null,
    authError: null
}

const auth = handleActions({
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => produce(state, draft => {
        draft[form][key] = value
    }),
    [INIT_FORM]: () => initialState,
    [REGISTER]: (state, action) => produce(state, draft => {
        draft.loading = true;
    }),
    [REGISTER_SUCCESS]: (state, action) => produce(state, draft => {
        draft.loading = false;
        draft.auth = action.payload
    }),
    [REGISTER_FAILURE]: (state, action) => produce(state, draft => {
        draft.loading = false;
        draft.authError = action.payload
    }),
    [LOGIN]: (state, action) => produce(state, draft => {
        draft.loading = true;
    }),
    [LOGIN_SUCCESS]: (state, action) => produce(state, draft => {
        draft.loading = false;
        draft.auth = action.payload
    }),
    [LOGIN_FAILURE]: (state, action) => produce(state, draft => {
        draft.loading = false;
        draft.authError = action.payload
    })


}, initialState)

export default auth;