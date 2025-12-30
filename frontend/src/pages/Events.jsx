import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const Events = () => {
  const { currentUser, userRole, getToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const isAdmin = userRole === 'admin';

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle create/edit event submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (editingEvent) {
        // Update existing event
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${editingEvent._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new event
        await axios.post(
          `${import.meta.env.VITE_API_URL}/events`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowModal(false);
      setEditingEvent(null);
      setFormData({ name: '', date: '', time: '', location: '', description: '' });
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  // Handle event deletion
  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = await getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/events/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.');
      }
    }
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date.split('T')[0],
      time: event.time,
      location: event.location,
      description: event.description
    });
    setShowModal(true);
  };

  // Open modal for creating new event
  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({ name: '', date: '', time: '', location: '', description: '' });
    setShowModal(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg">Join us for exciting events and networking opportunities</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={openCreateModal}>
            Create Event
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No events scheduled at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Event Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                  rows="4"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
