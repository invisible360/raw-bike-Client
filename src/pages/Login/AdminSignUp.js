import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import toast from 'react-hot-toast';

const AdminSignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const navigate = useNavigate();
    

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
                        saveAdmin(data.name, data.email);
                        toast.success(`Admin SignUp Completed`);
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


    const saveAdmin = (name, email) => {
        const buyer = { name, email };
        fetch('http://localhost:5001/admin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyer)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {

                    reset();
                }

            })
    }

    return (
        <div className='flex justify-center items-center min-h-min my-10'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
                <h1 className="text-2xl font-bold text-center">Admin Sign Up</h1>
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

                        
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-gray-600">Password</label>

                        {/* react form hook validation */}
                        <input type="password" {...register("password", {
                            required: "Password required",
                            minLength: { value: 6, message: "Password must be 6 Character Long" },
                        })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 border bg-gray-50 text-gray-800 focus:border-cyan-600" />


                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                        
                    </div>
                    <button className="btn btn-success block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">Sign Up</button>

                    {signUpError && <p className='text-red-600'>{signUpError}</p>}

                </form>
            </div>

        </div>
    );
};

export default AdminSignUp;