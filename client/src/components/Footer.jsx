// Import necessary dependencies
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Footer component
const Footer = () => {
  return (
    <footer className="bg-grey-500 text-white mt-1 w-100">
      <div className="text-center p-3 bg-secondary">
        © {new Date().getFullYear()} Piyush and Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
