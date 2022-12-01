import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Signup = () => {
    useTitle('Buyer Sign Up');

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    // const [createdUserEmail, setCreatedUserEmail] = useState('')
    // const [createdSellerEmail, setCreatedSellerEmail] = useState('')
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    // const location = useLocation();

    // const from = location.state?.from.pathname || '/';

    // if(token){
    //     navigate('/');
    // }


    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveBuyer(data.name, data.email);
                        toast.success(`Buyer Logged`);
                        navigate('/');
                        

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error);
                setSignUPError(error?.message);
                reset();
            });
    }

    const saveBuyer = (name, email) => {
        const buyer = { name, email };
        fetch('https://raw-bike-server-invisible360.vercel.app/buyers', {
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
                    navigate(0);
                }
            })
    }


    return (
        <div className='flex justify-center items-center min-h-min my-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Sign Up as Buyer</h1>
                <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Name</label>
                        <input type="text" {...register("name", { required: "Name is Required" })} id="username" placeholder="Name" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />
                        {errors.name && <span className='text-red-600'>{errors.name?.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Email</label>
                        <input type="email" {...register("email", { required: true })} id="password" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />
                        {errors.email && <span className='text-red-600'>This field is required</span>}

                        <div className="flex justify-start text-md text-gray-600">
                            <Link rel="noopener noreferrer" to="#">* It is recommended to use different email for same person as Buyer and Seller while Registration</Link>
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Password</label>

                        {/* react form hook validation */}
                        <input type="password" {...register("password", {
                            required: "Password required",
                            minLength: { value: 6, message: "Password must be 6 Character Long" },
                        })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />


                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                        <div className="flex justify-end text-md text-gray-600">
                            <Link rel="noopener noreferrer" to="#">Forgot Password?</Link>
                        </div>
                    </div>
                    <button className="btn btn-success block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">Sign Up</button>

                    {signUpError && <p className='text-red-600'>{signUpError}</p>}

                </form>


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