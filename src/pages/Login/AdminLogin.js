import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { login } = useContext(AuthContext);

    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const handleLogin = data => {
        // console.log(data);
        setLoginError('');
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                fetch(`http://localhost:5001/users?users=${data.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.buyer) {
                            toast.success("buyer logged");

                            reset();

                        }
                        else {
                            toast.success("seller logged");

                            reset();
                        }

                    })
            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message);
                reset();
            });
    }





    const saveAdmin = (name, email) => {
        const buyer = { name, email };
        fetch('http://localhost:5001/buyers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyer)
        })
            .then(res => res.json())
            .then(data => {
                // setCreatedUserEmail(email);
                if (data.acknowledged) {
                    // navigate('/dashboard.admin');
                    reset();
                }

            })
    }

    return (
        <div className='flex justify-center items-center min-h-min my-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Email</label>
                        <input type="email" {...register("email", { required: 'Email is Required' })} id="username" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />
                        {errors.email && <span className='text-red-600'>{errors.email?.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Password</label>
                        <input type="password" {...register("password", { required: true })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />
                        {errors.password && <span className='text-red-600'>This field is required</span>}

                    </div>
                    <button className=" btn btn-success block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">Login</button>

                    <div className='flex items-center justify-center'>
                        <p>Go to <Link to='/login' className='btn-link'>User Login Page</Link> If you are not Admin</p>
                    </div>

                    {loginError && <p className='text-red-600'>{loginError}</p>}

                </form>

            </div>

        </div>
    );
};

export default AdminLogin;