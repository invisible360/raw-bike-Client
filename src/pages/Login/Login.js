import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ImTwitter } from "react-icons/im";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { googleLogin } = useContext(AuthContext);

    const [signUpError, setSignUPError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/';

    const onSubmit = data => {
        console.log(data);
        reset()
    };



    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                saveBuyer(user.displayName, user.email);

            })
            .then(error => {
                console.error(error);
                setSignUPError(error.message)
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
                reset();
                navigate(from, { replace: true });

            })
    }


    return (
        <div className='flex justify-center items-center min-h-min my-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid">
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

                    {signUpError && <p className='text-red-600'>{signUpError}</p>}

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
                    <button aria-label="Log in with Twitter" className="text-2xl">
                        <ImTwitter></ImTwitter>
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