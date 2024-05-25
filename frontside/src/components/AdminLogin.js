import React, { useState, useEffect } from 'react';
import {  useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ALERT_TYPES } from '../redux/actions/alertActions';
import '../styles/Login.css';

const AdminLogin = () => {
    const initialState = { email: '', password: '' };
    const history = useHistory();
    const { auth } = useSelector(state => state);
    const [showPass, setShowPass] = useState(false);
    const [adminData, setAdminData] = useState(initialState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
            history.push('/admin/dashboard');
        }
    }, [auth.token, history]);

    const { email, password } = adminData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/alogin', { email, password });
            localStorage.setItem('adminAccessToken', res.data.access_token);
            dispatch({ type: 'ADMIN_LOGIN', payload: { admin: res.data.admin } });
            history.push('/admin/dashboard');
        } catch (error) {
            dispatch({ type: ALERT_TYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h3 className="login-header">Admin Portal</h3>
                <h6 className="login-subheader">Login</h6>
                <form className="login-dataform" onSubmit={handleSubmit}>
                    <input 
                        className="login-dataformemail"
                        type="email" 
                        name='email'
                        value={email}
                        onChange={handleChange}
                        placeholder="Type your email"
                        required
                    />
                    <input 
                        className="login-dataformpass"
                        type={showPass ? "text" : "password"}
                        placeholder="Type your password"
                        value={password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                    <small className="login-showpass" onClick={() => setShowPass(!showPass)}>
                        {showPass ? "Hide" : "Show"}
                    </small>
                    <button 
                        className="login-dataformbtn"
                        type="submit"
                    > 
                        Log In 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;