import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://tms-eta-nine.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const payload = await response.json();
            console.log(payload)
            setLoading(false);
            if (response.ok) {
                swal("Success!", "Logged in successfully", "success");
                if (payload && payload.user.role == 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
                // reponse send to redux
                dispatch({ type: 'LOGIN', payload });
            } else {
                swal("Oops!", payload.message || "Login failed", "error");
            }
        } catch (error) {
            setLoading(false);
            swal("Oops!", "Something went wrong. Please try again later.", "error");
            console.error("Login error:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='bg-white rounded col-md-10 mt-5 p-5'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h2>Sign In</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ?
                                            <div className="spinner-border" role="status" style={{ width: '20px', height: '20px' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            "Sign In"
                                        }
                                    </button>
                                    <div>
                                        <span>Do'nt have Account | </span><Link to='/register'>Register</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-6 text-center'>
                            <img src='/images/signup-image.jpg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};