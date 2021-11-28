import Modals from "../common/Modals";
import { change_field, init_form, register, login } from "../modules/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { withRouter } from "react-router";



const ModalsContainer = ({ visible, type, closeModal, history }) => {
    const dispatch = useDispatch();

    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth,
        auth: auth.auth,
        authError: auth.authError
    }))

    const onChange = e => {
        const { name, value } = e.target;
        dispatch(change_field({
            form: type,
            key: name,
            value
        }))
    }

    const onSubmit = e => {
        const { username, password, passwordConfirm } = form.register;
        e.preventDefault();

        if (passwordConfirm) {
            if ([username, password, passwordConfirm].includes("")) return;
            if (password !== passwordConfirm) return;
            dispatch(register({
                username,
                password
            }))
        }
        else {
            const { username, password } = form.login;
            if ([username, password].includes("")) return;
            dispatch(login({
                username,
                password
            }))
        }
    }

    useEffect(() => {
        dispatch(init_form());
    }, [dispatch, visible])

    useEffect(() => {
        if (auth) {
            history.go('/');
        }
        if (authError) {
            console.log(authError);
        }
    }, [auth, authError, history])

    return (
        <>
            <Modals
                form={form}
                visible={visible}
                type={type}
                closeModal={closeModal}
                onChange={onChange}
                onSubmit={onSubmit}
            ></Modals>
        </>
    );
};

export default withRouter(ModalsContainer);