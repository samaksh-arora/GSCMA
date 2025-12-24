import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const eventsRef = useRef(null);

  // Parallax for hero background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  // Check if sections are in view
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const eventsInView = useInView(eventsRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
        const sorted = res.data
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Hero Section with depth effect and animated background */}
      <div ref={heroRef} className="hero min-h-screen relative overflow-hidden">
        {/* Animated parallax background with continuous motion */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/IMG_4710.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: backgroundY,
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10" />
        
        <div className="hero-content text-center relative z-20">
          <div className="max-w-4xl">
            {/* Animated title with depth/3D effect */}
            <motion.h1
              className="text-7xl md:text-8xl font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-white"
                style={{
                  textShadow: `
                    0 1px 0 #ccc,
                    0 2px 0 #c9c9c9,
                    0 3px 0 #bbb,
                    0 4px 0 #b9b9b9,
                    0 5px 0 #aaa,
                    0 6px 1px rgba(0,0,0,.1),
                    0 0 5px rgba(0,0,0,.1),
                    0 1px 3px rgba(0,0,0,.3),
                    0 3px 5px rgba(0,0,0,.2),
                    0 5px 10px rgba(0,0,0,.25),
                    0 10px 10px rgba(0,0,0,.2),
                    0 20px 20px rgba(0,0,0,.15)
                  `,
                }}
              >
                GLOBAL SUPPLY CHAIN
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-secondary"
                style={{
                  textShadow: `
                    0 1px 0 #4ade80,
                    0 2px 0 #22c55e,
                    0 3px 0 #16a34a,
                    0 4px 0 #15803d,
                    0 5px 0 #166534,
                    0 6px 1px rgba(0,0,0,.1),
                    0 0 5px rgba(34, 197, 94, 0.4),
                    0 1px 3px rgba(0,0,0,.3),
                    0 3px 5px rgba(0,0,0,.2),
                    0 5px 10px rgba(0,0,0,.25),
                    0 10px 10px rgba(0,0,0,.2),
                    0 20px 20px rgba(0,0,0,.15)
                  `,
                }}
              >
                MANAGEMENT
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="block text-white"
                style={{
                  textShadow: `
                    0 1px 0 #ccc,
                    0 2px 0 #c9c9c9,
                    0 3px 0 #bbb,
                    0 4px 0 #b9b9b9,
                    0 5px 0 #aaa,
                    0 6px 1px rgba(0,0,0,.1),
                    0 0 5px rgba(0,0,0,.1),
                    0 1px 3px rgba(0,0,0,.3),
                    0 3px 5px rgba(0,0,0,.2),
                    0 5px 10px rgba(0,0,0,.25),
                    0 10px 10px rgba(0,0,0,.2),
                    0 20px 20px rgba(0,0,0,.15)
                  `,
                }}
              >
                ASSOCIATION
              </motion.span>
            </motion.h1>
            
            {/* Animated tagline */}
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Where curiosity meets industry and learning becomes an experience at Wayne State University.
            </motion.p>
            
            {/* Animated button with hover effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {currentUser ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/events"
                    className="btn btn-lg bg-white text-black hover:bg-white/90 border-none font-semibold text-lg px-8"
                  >
                    Explore Events →
                  </Link>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/join"
                    className="btn btn-lg bg-white text-black hover:bg-white/90 border-none font-semibold text-lg px-8"
                  >
                    Join Now →
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission + Features Section */}
      <div className="bg-base-100 py-20" ref={missionRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-base-content">Our Mission</h2>
            <p className="text-xl text-base-content/80 leading-relaxed">
              We connect students with industry professionals, provide hands-on learning opportunities,
              and foster a community of aspiring supply chain leaders.
            </p>
          </motion.div>

          {/* Features with staggered animation */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                ),
                title: 'Networking',
                description: 'Connect with industry professionals and fellow students passionate about supply chain.',
                color: 'primary',
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                ),
                title: 'Learning',
                description: 'Attend workshops, seminars, and events to enhance your supply chain knowledge.',
                color: 'secondary',
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                ),
                title: 'Career Growth',
                description: 'Access exclusive career opportunities and mentorship from industry leaders.',
                color: 'accent',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                >
                  <svg className={`w-8 h-8 text-${feature.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-base-content">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Events with scroll animation */}
          <div className="max-w-6xl mx-auto" ref={eventsRef}>
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold text-base-content">Upcoming Events</h3>
              <Link to="/events" className="text-primary hover:underline font-semibold">
                View all →
              </Link>
            </motion.div>

            {loadingEvents ? (
              <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : events.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={eventsInView ? { opacity: 1 } : {}}
              >
                <p className="text-xl text-base-content/60">No upcoming events scheduled yet.</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={eventsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <Link to="/events">
                      <div className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all h-full">
                        <div className="card-body">
                          <h4 className="card-title text-xl mb-2">{event.name}</h4>
                          <p className="text-sm text-base-content/60 mb-1">
                            📅 {event.date ? new Date(event.date).toLocaleDateString() : ''} • {event.time}
                          </p>
                          <p className="text-sm text-base-content/60 mb-4">📍 {event.location}</p>
                          <p className="text-sm text-base-content/80 line-clamp-3 mb-4">{event.description}</p>
                          <div className="card-actions">
                            <motion.button
                              className="btn btn-primary btn-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Learn more →
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
