import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <a href="/about" className="link link-hover">About us</a> 
        <a href="/contact" className="link link-hover">Contact</a> 
        <a href="/events" className="link link-hover">Events</a> 
        <a href="/join" className="link link-hover">Join</a>
      </div> 
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 hover:text-primary cursor-pointer" />
          </a> 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 hover:text-primary cursor-pointer" />
          </a> 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 hover:text-primary cursor-pointer" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 hover:text-primary cursor-pointer" />
          </a>
        </div>
      </div> 
      <div>
        <p>Copyright © {new Date().getFullYear()} - Global Supply Chain Management Association at Wayne State University</p>
      </div>
    </footer>
  );
};

export default Footer;
