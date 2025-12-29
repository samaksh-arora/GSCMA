import React from 'react';

const Officers = () => {
  // Officer data with placeholder images
  const officers = [
    {
      id: 1,
      name: 'Tharunika Vasudevan',
      position: 'President',
      year: 'Senior',
      image: ''
    },
    {
      id: 2,
      name: 'Daniel Kuznair',
      position: 'Co- Vice President',
      year: 'Junior',
      image: ''
    },
    {
      id: 3,
      name: 'Connor Diemend',
      position: 'Co- Vice President',
      year: 'Senior',
      image: ''
    },
    {
      id: 4,
      name: 'Aasiyah Imthias',
      position: 'Secretary',
      year: 'Sophomore',
      image: ''
    },
    {
      id: 5,
      name: 'Jessica Williams',
      position: 'Events Coordinator',
      year: 'Junior',
      image: ''
    },
    {
      id: 6,
      name: 'Alex Thompson',
      position: 'Marketing Director',
      year: 'Senior',
      image: ''
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
              <p className="text-sm text-gray-600">{officer.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Officers;
