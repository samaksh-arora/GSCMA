import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Event Card Component - displays event details with RSVP functionality
const EventCard = ({ event, isAdmin, onDelete, onEdit }) => {
  const { currentUser, getToken } = useAuth();
  const [isRsvped, setIsRsvped] = useState(
    event.attendees?.some(attendee => attendee.userId === currentUser?.uid) || false
  );

  // Handle RSVP to event
  const handleRsvp = async () => {
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/events/${event._id}/rsvp`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsRsvped(true);
      alert('Successfully RSVP\'d to event!');
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      alert('Failed to RSVP. Please try again.');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border-2 border-primary/20 hover:border-primary transition-all">
      <div className="card-body">
        <h2 className="card-title text-primary">{event.name}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
        <p className="text-base-content">{event.description}</p>
        
        <div className="card-actions justify-between items-center mt-4">
          <div className="badge badge-info">
            {event.attendees?.length || 0} {(event.attendees?.length || 0) === 1 ? 'Attendee' : 'Attendees'}
          </div>
          
          <div className="flex gap-2">
            {isAdmin ? (
              <>
                <button className="btn btn-sm btn-secondary" onClick={() => onEdit(event)}>Edit</button>
                <button className="btn btn-sm btn-error" onClick={() => onDelete(event._id)}>Delete</button>
              </>
            ) : (
              currentUser && (
                <button 
                  className={`btn btn-sm ${isRsvped ? 'btn-success' : 'btn-primary'} hover:btn-secondary transition-all`}
                  onClick={handleRsvp}
                  disabled={isRsvped}
                >
                  {isRsvped ? 'RSVP\'d ✓' : 'RSVP'}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
