import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const [usersRes, eventsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/users/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setUsers(usersRes.data);
      setEvents(eventsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  // Toggle payment status
  const togglePaymentStatus = async (userId, currentStatus) => {
    try {
      const token = await getToken();
      const newStatus = currentStatus === 'paid' ? 'not_paid' : 'paid';
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}/payment`,
        { paymentStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status.');
    }
  };

  // Toggle user role
  const toggleUserRole = async (userId, currentRole) => {
    try {
      const token = await getToken();
      const newRole = currentRole === 'admin' ? 'member' : 'admin';
      
      if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/users/${userId}/role`,
          { role: newRole },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role.');
    }
  };

  // Delete user
  const deleteUser = async (userId, userEmail) => {
    try {
      if (window.confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone.`)) {
        const token = await getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const paidMembers = users.filter(u => u.paymentStatus === 'paid').length;
  const totalMembers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-8 text-primary">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="stats shadow border-2 border-primary/20">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{totalMembers}</div>
            <div className="stat-desc">Registered users</div>
          </div>
        </div>

        <div className="stats shadow border-2 border-secondary/20">
          <div className="stat">
            <div className="stat-title">Paid Members</div>
            <div className="stat-value text-success">{paidMembers}</div>
            <div className="stat-desc">{totalMembers - paidMembers} pending</div>
          </div>
        </div>

        <div className="stats shadow border-2 border-accent/20">
          <div className="stat">
            <div className="stat-title">Admins</div>
            <div className="stat-value text-secondary">{adminCount}</div>
            <div className="stat-desc">Admin users</div>
          </div>
        </div>

        <div className="stats shadow border-2 border-info/20">
          <div className="stat">
            <div className="stat-title">Total Events</div>
            <div className="stat-value text-info">{events.length}</div>
            <div className="stat-desc">Scheduled events</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <a
          className={`tab ${activeTab === 'users' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </a>
        <a
          className={`tab ${activeTab === 'events' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </a>
      </div>

      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
          <div className="card-body">
            <h2 className="card-title mb-4 text-primary">User Management</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>Year</th>
                    <th>Role</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="font-semibold">{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.major}</td>
                      <td>{user.graduationYear}</td>
                      <td>
                        <div className={`badge ${user.role === 'admin' ? 'badge-secondary' : 'badge-primary'}`}>
                          {user.role}
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${user.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                          {user.paymentStatus === 'paid' ? 'Paid' : 'Not Paid'}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-primary"
                            onClick={() => togglePaymentStatus(user._id, user.paymentStatus)}
                          >
                            Toggle Payment
                          </button>
                          <button
                            className="btn btn-xs btn-secondary"
                            onClick={() => toggleUserRole(user._id, user.role)}
                          >
                            Toggle Role
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => deleteUser(user._id, user.email)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Events Table */}
      {activeTab === 'events' && (
        <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
          <div className="card-body">
            <h2 className="card-title mb-4 text-primary">Event Management</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Attendees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="font-semibold">{event.name}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.time}</td>
                      <td>{event.location}</td>
                      <td>
                        <div className="badge badge-info">{event.attendees?.length || 0}</div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-xs btn-primary">Edit</button>
                          <button className="btn btn-xs btn-error">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
