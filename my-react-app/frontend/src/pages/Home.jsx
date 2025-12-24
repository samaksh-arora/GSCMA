import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20" style={{ backgroundImage: 'url(https://picsum.photos/seed/gscma/1920/1080)' }}>
        <div className="hero-overlay bg-gradient-to-br from-primary/80 to-secondary/60"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              <span className="text-white">Wayne State</span>
              <br />
              <span className="text-secondary">Global Supply Chain</span>
              <br />
              <span className="text-white">Management Association</span>
            </h1>
            <p className="mb-5 text-lg">Wayne State University's premier organization for future supply chain leaders. Join us to network, learn, and grow.</p>
            {currentUser ? (
              <Link to="/events" className="btn btn-secondary btn-lg hover:btn-primary transition-all">View Events</Link>
            ) : (
              <Link to="/join" className="btn btn-secondary btn-lg hover:btn-primary transition-all">Join Now</Link>
            )}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16 bg-base-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto text-base-content">
            We connect students with industry professionals, provide hands-on learning opportunities, 
            and foster a community of aspiring supply chain leaders at Wayne State University.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl border-2 border-primary/20 hover:border-primary transition-all hover:shadow-2xl">
            <figure className="px-10 pt-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary">Networking</h2>
              <p>Connect with industry professionals and fellow students passionate about supply chain management.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border-2 border-secondary/20 hover:border-secondary transition-all hover:shadow-2xl">
            <figure className="px-10 pt-10">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-secondary">Learning</h2>
              <p>Attend workshops, seminars, and events to enhance your supply chain knowledge and skills.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border-2 border-accent/20 hover:border-accent transition-all hover:shadow-2xl">
            <figure className="px-10 pt-10">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-accent">Career Growth</h2>
              <p>Access exclusive career opportunities and mentorship from supply chain industry leaders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
