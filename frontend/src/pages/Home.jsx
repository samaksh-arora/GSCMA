import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaBook, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const eventsRef = useRef(null);

  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax for hero background (disabled on mobile for performance)
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 150]);

  // Check if sections are in view (reduced margin for mobile)
  const missionInView = useInView(missionRef, { once: true, margin: '-50px' });
  const eventsInView = useInView(eventsRef, { once: true, margin: '-50px' });

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

  const features = [
    {
      icon: FaUsers,
      title: 'Networking',
      description: 'Connect with industry professionals and fellow students passionate about supply chain.',
      color: 'primary',
    },
    {
      icon: FaBook,
      title: 'Learning',
      description: 'Attend workshops, seminars, and events to enhance your supply chain knowledge.',
      color: 'secondary',
    },
    {
      icon: FaChartLine,
      title: 'Career Growth',
      description: 'Access exclusive career opportunities and mentorship from industry leaders.',
      color: 'accent',
    },
  ];

  return (
    <div>
      {/* Hero Section - Mobile Optimized */}
      <div ref={heroRef} className="hero min-h-screen relative overflow-hidden">
        {/* Animated parallax background - disabled on mobile */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/New_GSCMA_Background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: isMobile ? 0 : backgroundY,
          }}
          animate={isMobile || prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
          }}
          transition={isMobile || prefersReducedMotion ? {} : {
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10" />
        
        <div className="hero-content text-center relative z-20 px-4">
          <div className="max-w-5xl">
            {/* Responsive title - mobile first approach */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
                className="block text-white"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                GLOBAL SUPPLY CHAIN
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
                className="block text-white"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                MANAGEMENT ASSOCIATION
              </motion.span>
            </motion.h1>
            
            {/* Responsive tagline */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-10 font-light max-w-3xl mx-auto px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
              }}
            >
              Where curiosity meets industry and learning becomes an experience at Wayne State University.
            </motion.p>
            
            {/* Touch-friendly button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.8 }}
            >
              {currentUser ? (
                <motion.div 
                  whileHover={isMobile ? {} : { scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/events"
                    className="btn btn-md sm:btn-lg bg-white text-black hover:bg-white/90 border-none font-semibold text-base sm:text-lg px-6 sm:px-8 shadow-xl"
                  >
                    Explore Events
                  </Link>
                </motion.div>
              ) : (
                <motion.div 
                  whileHover={isMobile ? {} : { scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/join"
                    className="btn btn-md sm:btn-lg bg-white text-black hover:bg-white/90 border-none font-semibold text-base sm:text-lg px-6 sm:px-8 shadow-xl"
                  >
                    Join Now
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission + Features Section - Mobile Responsive */}
      <div className="bg-base-100 py-12 sm:py-16 md:py-20" ref={missionRef}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-base-content">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-base-content/80 leading-relaxed">
              We connect students with industry professionals, provide hands-on learning opportunities,
              and foster a community of aspiring supply chain leaders.
            </p>
          </motion.div>

          {/* Features grid - responsive from mobile to desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.2 }}
                whileHover={isMobile ? {} : { y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                  whileHover={isMobile || prefersReducedMotion ? {} : { rotate: 360, transition: { duration: 0.6 } }}
                >
                  <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 text-${feature.color}`} />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-base-content">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-base-content/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Events - Mobile optimized */}
          <div className="max-w-6xl mx-auto" ref={eventsRef}>
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content">
                Upcoming Events
              </h3>
              <Link to="/events" className="text-primary hover:underline font-semibold text-sm sm:text-base">
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
                <p className="text-lg sm:text-xl text-base-content/60">
                  No upcoming events scheduled yet.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={eventsInView ? { opacity: 1, y: 0 } : {}}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.15 }}
                    whileHover={isMobile ? {} : { y: -10, scale: 1.02 }}
                  >
                    <Link to="/events">
                      <div className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all h-full shadow-lg hover:shadow-xl">
                        <div className="card-body p-4 sm:p-6">
                          <h4 className="card-title text-lg sm:text-xl mb-2">
                            {event.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-base-content/60 mb-1">
                            📅 {event.date ? new Date(event.date).toLocaleDateString() : ''} • {event.time}
                          </p>
                          <p className="text-xs sm:text-sm text-base-content/60 mb-3 sm:mb-4">
                            📍 {event.location}
                          </p>
                          <p className="text-xs sm:text-sm text-base-content/80 line-clamp-3 mb-3 sm:mb-4">
                            {event.description}
                          </p>
                          <div className="card-actions">
                            <motion.button
                              className="btn btn-primary btn-xs sm:btn-sm"
                              whileHover={isMobile ? {} : { scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Learn more
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
