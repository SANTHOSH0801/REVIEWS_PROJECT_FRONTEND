import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import Navbar from '../Components/Navbar';
import bgImage from '../assets/LoginbagroundImage.avif';


function LoginPage() {

    useEffect(() => {
        document.body.classList.add('login-page-no-scroll');
        return () => {
            document.body.classList.remove('login-page-no-scroll');
        };
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const containerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: '80%',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }

        try {
            const response = await axios.post('https://reviews-app-backend-023o.onrender.com/api/auth/login', {
                email,
                password,
            });

            const { token, role, name } = response.data;

            // Store token and user info in localStorage (or context/state management)
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', name);
            localStorage.setItem('email', email);

            if (role === 'System Administrator') {
                navigate('/admin/AdminDashboard')
            } else if (role === 'Normal User') {
                navigate('/Normaluser/Stores')
            } else {
                navigate('/OwnerUser/OwnerDashboard')
            }



        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <main className="main-container-loginpage signup-container-loginpage" style={containerStyle}>
                <div className="form-section-loginpage">
                    <h1 className="form-title-loginpage">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field-loginpage"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field-loginpage"
                            />
                        </div>
                        <button type="submit" className="submit-btn-loginpage">
                            Login
                        </button>
                    </form>
                    {errorMessage && <p className="error-message-loginpage">{errorMessage}</p>}
                </div>
                <div className="image-section-loginpage">
                    {/* You can insert an <img> here with className="signup-image-loginpage" if needed */}
                </div>
            </main>
        </>

    );
}

export default LoginPage;
