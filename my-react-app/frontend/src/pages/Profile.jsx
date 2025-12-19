import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Unable to load profile data.</p>
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
