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
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img 
          src={`https://picsum.photos/seed/${event._id}/400/250`} 
          alt={event.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p className="text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </p>
        <p className="text-sm text-gray-500">📍 {event.location}</p>
        <p className="mt-2">{event.description}</p>
        
        <div className="card-actions justify-end mt-4">
          {isAdmin ? (
            <>
              <button className="btn btn-sm btn-warning" onClick={() => onEdit(event)}>Edit</button>
              <button className="btn btn-sm btn-error" onClick={() => onDelete(event._id)}>Delete</button>
              <div className="badge badge-info">{event.attendees?.length || 0} Attendees</div>
            </>
          ) : (
            currentUser && (
              <button 
                className={`btn btn-sm ${isRsvped ? 'btn-success' : 'btn-primary'}`}
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
  );
};

export default EventCard;
