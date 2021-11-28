import React, { useEffect, useState } from 'react';
import HeaderForm from '../components/HeaderForm';
import { useSelector } from 'react-redux';
import { logout } from '../lib/api/auth';
import { Cookies } from 'react-cookie'

const HeaderFormContainer = () => {
    const cookies = new Cookies();
    const { auth } = useSelector(({ auth }) => ({
        auth: auth.auth,
    }))
    const [user, setUser] = useState('')
    useEffect(() => {
        if (cookies.get('user')) {
            setUser(cookies.get('user'));
        }

    }, [])

    const onLogout = async () => {
        const result = window.confirm('로그아웃 하시겠습니까?');
        if (!result) return;
        await logout();
        setUser('');
    }

    return (
        <div>
            <HeaderForm onLogout={onLogout} user={user}></HeaderForm>
        </div>
    );
};

export default HeaderFormContainer;