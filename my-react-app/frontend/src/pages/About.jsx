import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { currentUser, userRole } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-primary">About GSCMA</h1>
        
        {/* Welcome Message for Signed-in Users */}
        {currentUser && (
          <div className="alert alert-success mb-8 border-2 border-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Welcome to GSCMA, {currentUser.email.split('@')[0]}!</h3>
              <div className="text-xs">
                {userRole === 'admin' ? 
                  'As an admin, you have access to manage events and members.' : 
                  'You\'re now part of Wayne State\'s premier supply chain community.'
                }
              </div>
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img 
              src="https://picsum.photos/seed/about1/600/400" 
              alt="GSCMA Team" 
              className="rounded-lg shadow-lg w-full border-2 border-primary/20"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-secondary">Who We Are</h2>
            <p className="text-lg mb-4">
              The Global Supply Chain Management Association at Wayne State University is a student-run 
              organization dedicated to promoting excellence in supply chain education, research, and practice.
            </p>
            <p className="text-lg">
              Founded by students passionate about logistics, operations, and global trade, we provide 
              a platform for networking, professional development, and industry engagement.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-secondary">What We Do</h2>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Host industry speakers and panel discussions</li>
              <li>Organize company tours and site visits</li>
              <li>Facilitate networking events with professionals</li>
              <li>Provide career development workshops</li>
              <li>Connect students with internship opportunities</li>
              <li>Compete in supply chain case competitions</li>
            </ul>
          </div>
          <div>
            <img 
              src="https://picsum.photos/seed/about2/600/400" 
              alt="Events" 
              className="rounded-lg shadow-lg w-full border-2 border-secondary/20"
            />
          </div>
        </div>

        {/* Member Benefits Section - Only for signed-in users */}
        {currentUser && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8 border-2 border-primary/20">
            <h2 className="text-3xl font-bold mb-4 text-center text-primary">Your Member Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary">Exclusive Events</h3>
                <p className="text-sm">Access to member-only workshops and networking events</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6" />
                  </svg>
                </div>
                <h3 className="font-bold text-secondary">Career Resources</h3>
                <p className="text-sm">Job postings, internship opportunities, and career guidance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-accent">Network Access</h3>
                <p className="text-sm">Connect with alumni and industry professionals</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions for Members */}
        {currentUser && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link to="/events" className="card bg-base-100 shadow-xl border-2 border-primary/20 hover:border-primary transition-all">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-primary">View Events</h3>
                <p>Check out upcoming events and RSVP</p>
              </div>
            </Link>
            <Link to="/members" className="card bg-base-100 shadow-xl border-2 border-secondary/20 hover:border-secondary transition-all">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-secondary">Member Directory</h3>
                <p>Connect with fellow members</p>
              </div>
            </Link>
            <Link to="/profile" className="card bg-base-100 shadow-xl border-2 border-accent/20 hover:border-accent transition-all">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-accent">My Profile</h3>
                <p>Update your information</p>
              </div>
            </Link>
          </div>
        )}

        {/* Admin Quick Actions */}
        {userRole === 'admin' && (
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg p-6 mb-8 border-2 border-secondary/20">
            <h3 className="text-2xl font-bold mb-4 text-center text-secondary">Admin Tools</h3>
            <div className="flex justify-center gap-4">
              <Link to="/admin" className="btn btn-secondary">Admin Dashboard</Link>
              <button className="btn btn-primary">Create Event</button>
              <button className="btn btn-accent">Manage Members</button>
            </div>
          </div>
        )}

        {/* Call to Action - Different for signed in vs not signed in users */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-8 text-center border-2 border-primary/20">
          {currentUser ? (
            <>
              <h2 className="text-3xl font-bold mb-4 text-primary">You're Part of the Community!</h2>
              <p className="text-lg mb-6">
                As a GSCMA member, you have access to exclusive events, networking opportunities, 
                and career resources. Make the most of your membership!
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/events" className="btn btn-primary btn-lg">View Upcoming Events</Link>
                <Link to="/members" className="btn btn-secondary btn-lg">Connect with Members</Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 text-primary">Join Our Community</h2>
              <p className="text-lg mb-6">
                Whether you're studying supply chain management, business, engineering, or any related field, 
                GSCMA welcomes all Wayne State students interested in supply chain and logistics.
              </p>
              <Link to="/join" className="btn btn-primary btn-lg hover:btn-secondary transition-all">Become a Member</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
