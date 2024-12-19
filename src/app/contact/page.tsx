"use client"
import React, { useState } from 'react';
import './Contact.css';
// import { FaHeart } from 'react-icons/fa'; // Importing the love icon

const Contact: React.FC = () => {
  const [paused, setPaused] = useState(false);

  const testimonials = [
    { 
      name: 'John Doe', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'This real estate team helped me find the perfect home. Highly recommended!',
      likes: 120
    },
    { 
      name: 'Jane Smith', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'I had an amazing experience working with them. They truly care about their clients!',
      likes: 90
    },
    { 
      name: 'Alex Johnson', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'Professional and attentive. They made my first-time home buying process seamless.',
      likes: 75
    },
    { 
      name: 'Emily Davis', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'Such a great experience! They helped me sell my property quickly and for a great price.',
      likes: 110
    },
    { 
      name: 'Michael Brown', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'Very knowledgeable and friendly team. They were with me every step of the way.',
      likes: 140
    },
    { 
      name: 'Sophia Lee', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'I couldn’t have asked for a better team to work with. They made the process so easy!',
      likes: 95
    },
    { 
      name: 'David Wilson', 
      image: '/sunset-office-view-stockcake.jpeg', // Replace with your image URL
      testimonial: 'I’m so grateful to this team for helping me find my dream home. 10/10 would recommend!',
      likes: 80
    }
  ];

  const togglePause = () => {
    setPaused(!paused);
  };

  return (
    <div>
      {/* First Section: Contact Banner */}
      <div className="contact-container">
        <div className="contact-overlay">
          <div className="contact-content">
            <h1>Get in Touch with Our Real Estate Team</h1>
            <p>We’re here to help with your property needs</p>
            <button className="cta-button">Contact Us</button>
          </div>
        </div>
      </div>

      {/* Second Section: Contact Form */}
      <section className="form-section">
        <div className="form-container">
          <h2>Contact Us</h2>
          <p>Fill out the form below and we’ll get back to you as soon as possible.</p>
          <form className="contact-form space-y-4">
            <input type="text" placeholder="Your Name" className='p-4' required />
            <input type="email" placeholder="Your Email" className='p-4' required />
            <textarea placeholder="Your Message" className='p-4' required />
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </section>



      {/* Fifth Section: Testimonials */}
  
    </div>
  );
};

export default Contact;
