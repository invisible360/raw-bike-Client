import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { googleLogin, login } = useContext(AuthContext);

    const [loginError, setLoginError] = useState('');


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/';

    const { data: buyers = [], isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/buyers`);
            const data = await res.json();
            return data;
        }
    })

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
                            navigate(from, { replace: true });
                            reset();

                        }
                        else {
                            toast.success("seller logged");
                            navigate(from, { replace: true });
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



    const handleGoogleSignIn = () => {
        setLoginError('');
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                const alreadyBuyer = buyers.find(buyer => buyer.email === user.email)
                if (!alreadyBuyer) {
                    saveBuyer(user.displayName, user.email);
                    toast.success(`Welcome ${user.displayName}`);

                }
                else {
                    toast.success(`Welcome ${user.displayName}`);
                    navigate(from, { replace: true });

                }
            })
            .then(error => {
                console.error(error);
                setLoginError(error?.message);
            })

    }

    const saveBuyer = (name, email) => {
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
                    navigate(from, { replace: true });
                    reset();
                }

            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='flex justify-center items-center min-h-min my-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
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
                        <div className="flex justify-end text-md text-gray-600">
                            <Link rel="noopener noreferrer" to="#">Forgot Password?</Link>
                        </div>
                    </div>
                    <button className=" btn btn-success block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">Sign in</button>

                    {loginError && <p className='text-red-600'>{loginError}</p>}

                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-md text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-8">
                    <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="text-2xl">
                        <FcGoogle></FcGoogle>
                    </button>

                </div>
                <p className="text-lg text-center sm:px-6 text-gray-600">Don't have an account?
                    <Link rel="noopener noreferrer" to="/signup" className=" underline text-gray-800">Sign up</Link>
                </p>
            </div>

        </div>
    );
};

export default Login;