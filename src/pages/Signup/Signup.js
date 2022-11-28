import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { ImTwitter } from 'react-icons/im';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const Signup = () => {
    useTitle('Buyer Sign Up');
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = data => {
        console.log(data);
        reset()
    }

    return (
        <div className='flex justify-center items-center min-h-min my-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Sign Up  as Buyer</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Name</label>
                        <input type="text" {...register("name", { required: "Name is Required" })} id="username" placeholder="Name" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />
                        {errors.name && <span className='text-red-600'>{errors.name?.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Email</label>
                        <input type="email" {...register("email", { required: true })} id="password" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />
                        {errors.email && <span className='text-red-600'>This field is required</span>}

                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Password</label>

                        {/* react form hook validation */}
                        <input type="password" {...register("password", {
                            required: "Password required",
                            minLength: { value: 6, message: "Password must be 6 Character Long" },
                            /* pattern: { value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])$/, message: "Password Must Strong"} */
                        })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />


                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                        <div className="flex justify-end text-md text-gray-600">
                            <Link rel="noopener noreferrer" to="#">Forgot Password?</Link>
                        </div>
                    </div>
                    <button className="btn btn-success block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">Sign Up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-md text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-8">
                    <button aria-label="Log in with Google" className="text-2xl">
                        <FcGoogle></FcGoogle>
                    </button>
                    <button aria-label="Log in with Twitter" className="text-2xl">
                        <ImTwitter></ImTwitter>
                    </button>
                </div>
                <p className="text-lg text-center sm:px-6 text-gray-600">Are You Seller? 
                    <Link rel="noopener noreferrer" to="/sellerSignin" className="underline text-gray-800">Create Account as Seller</Link>
                </p>
                <p className="text-lg text-center sm:px-6 text-gray-600">Already have an Account? 
                    <Link rel="noopener noreferrer" to="/login" className="underline text-gray-800">Login</Link>
                </p>
            </div>

        </div>
    );
};

export default Signup;