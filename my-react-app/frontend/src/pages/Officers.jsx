import React from 'react';

const Officers = () => {
  // Officer data with placeholder images
  const officers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'President',
      major: 'Supply Chain Management',
      year: 'Senior',
      email: 'president@gscma.org',
      image: 'https://i.pravatar.cc/300?img=1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Vice President',
      major: 'Operations Management',
      year: 'Junior',
      email: 'vp@gscma.org',
      image: 'https://i.pravatar.cc/300?img=2'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Treasurer',
      major: 'Business Administration',
      year: 'Senior',
      email: 'treasurer@gscma.org',
      image: 'https://i.pravatar.cc/300?img=3'
    },
    {
      id: 4,
      name: 'David Patel',
      position: 'Secretary',
      major: 'Logistics Management',
      year: 'Sophomore',
      email: 'secretary@gscma.org',
      image: 'https://i.pravatar.cc/300?img=4'
    },
    {
      id: 5,
      name: 'Jessica Williams',
      position: 'Events Coordinator',
      major: 'Supply Chain Management',
      year: 'Junior',
      email: 'events@gscma.org',
      image: 'https://i.pravatar.cc/300?img=5'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      position: 'Marketing Director',
      major: 'Marketing',
      year: 'Senior',
      email: 'marketing@gscma.org',
      image: 'https://i.pravatar.cc/300?img=6'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Our Officers</h1>
        <p className="text-lg">Meet the dedicated team leading GSCMA at Wayne State University</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {officers.map((officer) => (
          <div key={officer.id} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img 
                src={officer.image} 
                alt={officer.name} 
                className="rounded-full w-48 h-48 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{officer.name}</h2>
              <div className="badge badge-primary">{officer.position}</div>
              <p className="text-sm text-gray-600">{officer.major}</p>
              <p className="text-sm text-gray-600">{officer.year}</p>
              <a href={`mailto:${officer.email}`} className="link link-primary">{officer.email}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Officers;
