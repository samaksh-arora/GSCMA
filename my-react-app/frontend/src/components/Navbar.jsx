import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Safely get auth - won't crash if context isn't ready
  let currentUser = null;
  let userRole = null;
  let logout = null;
  
  try {
    const auth = useAuth();
    currentUser = auth?.currentUser;
    userRole = auth?.userRole;
    logout = auth?.logout;
  } catch (error) {
    console.log('Auth not available yet');
  }

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/officers">Officers</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {currentUser && <li><Link to="/members">Members</Link></li>}
            {userRole === 'admin' && <li><Link to="/admin">Admin</Link></li>}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">GSCMA</Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/officers">Officers</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {currentUser && <li><Link to="/members">Members</Link></li>}
          {userRole === 'admin' && <li><Link to="/admin">Admin</Link></li>}
        </ul>
      </div>
      
      <div className="navbar-end">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={`https://ui-avatars.com/api/?name=${currentUser.email}&background=random`} alt="Profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/profile">Profile</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/join" className="btn btn-primary btn-sm mr-2">Join</Link>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
