// src/App.jsx - Remove BrowserRouter from here!
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // NOT BrowserRouter
import { AuthProvider } from './context/AuthContext';
// ... rest of imports

function App() {
  return (
    <AuthProvider>
      {/* NO <Router> wrapper here */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* ... other routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home'; // ADD ONE PAGE AT A TIME

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} /> {/* TEST HOME */}
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;
