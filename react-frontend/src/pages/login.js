import React, { useState } from 'react';

import './login.css';

import axios from "axios"

import {useNavigate} from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const user = {
            username: username,
            password: password
        }

        await axios.post('/login', user, {withCredentials:true,
            headers: {
            'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                navigate("/")
            } else {
                alert('Wrong credentials');
            }
        }).catch((e)=>{
            console.error('Error:', e);
        });
    };

    return (
        <div className="Container">
            <div className='LoginContainer'>
                <h1 className='LoginHeader'>Login</h1>
                <input
                    className='LoginInput'
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='LoginInput'
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='LoginButton' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;