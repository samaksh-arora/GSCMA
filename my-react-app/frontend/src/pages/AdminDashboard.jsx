import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventAttendees, setEventAttendees] = useState([]);
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);

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

  // Fetch event attendees
  const fetchEventAttendees = async (eventId, eventName) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${eventId}/attendees`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEventAttendees(response.data);
      setSelectedEvent(eventName);
      setShowAttendeesModal(true);
    } catch (error) {
      console.error('Error fetching event attendees:', error);
      alert('Failed to fetch event attendees.');
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.major.toLowerCase().includes(searchLower) ||
      user.graduationYear.toString().includes(searchLower)
    );
  });

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
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-primary">User Management</h2>
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="input input-bordered input-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-square btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {searchTerm && (
              <div className="alert alert-info mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Showing {filteredUsers.length} of {users.length} users matching "{searchTerm}"</span>
                <button 
                  className="btn btn-sm btn-ghost"
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </button>
              </div>
            )}

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
                  {filteredUsers.map((user) => (
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
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found matching your search.</p>
                </div>
              )}
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
                        <button 
                          className="badge badge-info cursor-pointer hover:badge-primary"
                          onClick={() => fetchEventAttendees(event._id, event.name)}
                        >
                          {event.attendees?.length || 0} attendees
                        </button>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-xs btn-info"
                            onClick={() => fetchEventAttendees(event._id, event.name)}
                          >
                            View Attendees
                          </button>
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

      {/* Event Attendees Modal */}
      {showAttendeesModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg text-primary mb-4">
              Attendees for "{selectedEvent}"
            </h3>
            
            {eventAttendees.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>RSVP Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventAttendees.map((attendee, index) => (
                      <tr key={index}>
                        <td className="font-semibold">{attendee.userName}</td>
                        <td>{new Date(attendee.rsvpDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No attendees have RSVP'd for this event yet.</p>
              </div>
            )}
            
            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={() => setShowAttendeesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
