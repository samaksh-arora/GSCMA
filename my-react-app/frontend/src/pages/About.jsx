import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">About GSCMA</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img 
              src="https://picsum.photos/seed/about1/600/400" 
              alt="GSCMA Team" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
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
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
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
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        <div className="bg-base-200 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-6">
            Whether you're studying supply chain management, business, engineering, or any related field, 
            GSCMA welcomes all Wayne State students interested in supply chain and logistics.
          </p>
          <a href="/join" className="btn btn-primary btn-lg">Become a Member</a>
        </div>
      </div>
    </div>
  );
};

export default About;
