import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    } else {
      setLoading(false);
      setError('No user logged in');
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      console.log('Fetching user data with token:', token.substring(0, 20) + '...');
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      console.log('User data response:', response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        setError(`Server error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Make sure the backend is running.');
      } else {
        console.error('Error message:', error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Profile Error</h3>
            <div className="text-xs">{error}</div>
          </div>
        </div>
        <button 
          className="btn btn-primary mt-4" 
          onClick={fetchUserData}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="alert alert-warning max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="font-bold">No Profile Data</h3>
            <div className="text-xs">Unable to load profile information.</div>
          </div>
        </div>
        <button 
          className="btn btn-primary mt-4" 
          onClick={fetchUserData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&size=200&background=random`}
                  alt="Profile"
                  className="rounded-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{userData.firstName} {userData.lastName}</h2>
                <div className="badge badge-primary">{userData.role}</div>
                {userData.paymentStatus && (
                  <div className={`badge ${userData.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {userData.paymentStatus === 'paid' ? 'Dues Paid ✓' : 'Dues Pending'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="md:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                    <p className="text-lg">{userData.email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Major</p>
                    <p className="text-lg">{userData.major}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Graduation Year</p>
                      <p className="text-lg">{userData.graduationYear}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Phone Number</p>
                      <p className="text-lg">{userData.phoneNumber}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Member Since</p>
                    <p className="text-lg">{new Date(userData.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            </div>

            {/* Upcoming RSVPs */}
            <div className="card bg-base-100 shadow-xl mt-6">
              <div className="card-body">
                <h2 className="card-title">My RSVPs</h2>
                <p className="text-gray-500">Events you've registered for will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
