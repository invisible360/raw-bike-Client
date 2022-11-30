import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import noPhotoThumb from '../../assets/placeholder.png'

const NavHeader = () => {
    const { user, logout } = useContext(AuthContext);

    const [loggedUser, setLoggedUser] = useState('');
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5001/allUsers`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const admin = data.find(ad => ad.email === user?.email && ad.role === 'admin')
                if (admin) {
                    setAdmin(true);
                }

                else {

                    fetch(`http://localhost:5001/users?users=${user?.email}`)
                        .then(res => res.json())
                        .then(data => {
                            setLoggedUser(data);
                        })

                }
            })

    }, [user?.email])


    const handleSignOut = () => {
        logout()
            .then(() => { })
            .catch(error => console.error(error))
    }

    const menuItems = <>
        <li className='text-blue-500'><Link to="/home">Home</Link></li>
        {user && loggedUser.buyer && <li className='text-blue-500'><Link to='/dashboard/buyer'>Dashbord</Link></li>}
        {user && loggedUser.seller && <li className='text-blue-500'><Link to='/dashboard/seller'>Dashbord</Link></li>}
        {user && admin && <li className='text-blue-500'><Link to='/dashboard/admin'>Dashbord</Link></li>}
        <li className='text-blue-500'><Link to="/blog">Blog</Link></li>

    </>

    return (
        <div className="navbar flex justify-between bg-transparent w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-warning lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-yellow-200 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>


                <Link to='/' className="btn btn-ghost normal-case text-xl"><span className='italic font-bold text-3xl text-yellow-500'>Raw Bike.</span></Link>
            </div>

            {/* small device profile photo info */}
            <div className="dropdown dropdown-end">
                <label tabIndex={1} className="lg:hidden">
                    {/* Avatar */}
                    <div className="avatar lg:hidden">
                        <div className="w-12 rounded-full">
                            {
                                user ?
                                    <img src={user.photoURL} alt='' />
                                    :
                                    <img src={noPhotoThumb} alt='NoPhoto' />
                            }
                        </div>
                    </div>
                </label>
                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36">

                    {
                        user ?
                            <>
                                <li className='text-blue-500'><Link to='/profile'>{user.displayName}</Link></li>
                                <li><Link to='/login'><button onClick={handleSignOut} className='btn btn-sm btn-warning btn-outline'>Sign Out</button></Link></li>
                            </>
                            :
                            <li><Link to='/login'><button className='btn btn-sm btn-success btn-outline'>Sign In</button></Link></li>
                    }
                </ul>
            </div>



            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                    {
                        user ?
                            <>
                                <li><Link to='/login'><button onClick={handleSignOut} className='btn btn-sm btn-warning btn-outline'>Sign Out</button></Link></li>
                                <li className='text-blue-500'><Link to='/profile'>{user.displayName}</Link></li>
                            </>
                            :
                            <li><Link to='/login'><button className='btn btn-sm btn-success btn-outline'>Sign In</button></Link></li>
                    }

                </ul>

                {/* Avatar */}
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        {
                            user ?
                                <img src={user.photoURL} alt='' />
                                :
                                <img src={noPhotoThumb} alt='NoPhoto' />
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NavHeader;