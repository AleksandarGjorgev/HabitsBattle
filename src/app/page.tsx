// YourComponent.tsx
import React from 'react';
import Navbar from './components/navbar.jsx'; // Adjust the path as per your project structure
import Welcome from './components/welcome.jsx';

const Page = () => {
  return (
    <div>
      <Navbar />
      <Welcome />
    </div>
  );
};

export default Page;