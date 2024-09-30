import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await fetch('https://tms-eta-nine.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, role:'user', email, password }),
            });

            const data = await response.json();
            setLoading(false)
            setName('')
            setEmail('')
            setPassword('')
            navigate('/login')
            swal("success!", "User Registered Succesfully", "success");
            if (!response.ok) {
                throw new Error(data.message || 'Server error');
                setLoading(false)
                swal("Oops!", "Not Registered", "error");
            }
        } catch (err) {
            setLoading(false)
            swal("Oops!", "Not Registered", "error");
            console.log('error in register', err.message)
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='bg-white rounded col-md-10 mt-3 p-5'>
                    <div className='row'>
                        <div className='col-md-6 mx-auto'>
                            <h2>Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="Name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        id="Name"
                                        className='form-control'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="Email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        id="Email"
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className='form-control'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ?
                                            <div className="spinner-border" role="status" style={{width:'20px', height:'20px'}}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            "Sign Up"
                                        }
                                    </button>
                                    <div>
                                        <span>Already have Account | </span><Link to='/login'>Login</Link>
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