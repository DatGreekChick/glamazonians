import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <span>GraceShopper&tm;</span>
      <Link to='/about'><span>About Us</span></Link>
      <Link to='/contact-us'><span>Contact Us</span></Link>
      <Link to='/careers'><span>Careers</span></Link>
      <Link to='/faqs'><span>FAQs</span></Link>
    </div>
  );
};

export default Footer;
