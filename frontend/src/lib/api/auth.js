import client from './index';


export const register = ({ username, password }) => client.post('/api/auth/register', ({ username, password }));

export const login = ({ username, password }) => client.post('/api/auth/login', ({ username, password }));

export const logout = () => client.get('/api/auth/logout');