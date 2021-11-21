import { createAction, handleActions } from 'redux-actions'
import produce from 'immer';


const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INIT_FORM = 'auth/INIT_FORM';

export const change_field = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
    form,
    key,
    value
}));

export const init_form = createAction(INIT_FORM);

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
    auth: null,
    authError: null
}

const auth = handleActions({
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => produce(state, draft => {
        draft[form][key] = value
    }),
    [INIT_FORM]: () => initialState

}, initialState)

export default auth;