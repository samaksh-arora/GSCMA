import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://picsum.photos/seed/gscma/1920/1080)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Global Supply Chain Management Association</h1>
            <p className="mb-5">Wayne State University's premier organization for future supply chain leaders. Join us to network, learn, and grow.</p>
            {currentUser ? (
              <Link to="/events" className="btn btn-primary">View Events</Link>
            ) : (
              <Link to="/join" className="btn btn-primary">Join Now</Link>
            )}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto">
            We connect students with industry professionals, provide hands-on learning opportunities, 
            and foster a community of aspiring supply chain leaders at Wayne State University.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://picsum.photos/seed/networking/200/200" alt="Networking" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Networking</h2>
              <p>Connect with industry professionals and fellow students passionate about supply chain management.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://picsum.photos/seed/learning/200/200" alt="Learning" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Learning</h2>
              <p>Attend workshops, seminars, and events to enhance your supply chain knowledge and skills.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://picsum.photos/seed/career/200/200" alt="Career" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Career Growth</h2>
              <p>Access exclusive career opportunities and mentorship from supply chain industry leaders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
