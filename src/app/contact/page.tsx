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
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required />
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </section>

      {/* Third Section: Map Integration */}
      <section className="map-section">
        <h2>Visit Us</h2>
        <p>Our office is located at [Your Address]. Feel free to come by!</p>
        <div className="map-container">
          <iframe 
            title="Office Location"
            width="100%" 
            height="400" 
            src="https://www.google.com/maps/embed/v1/place?q=Your+Office+Address&key=YOUR_GOOGLE_MAPS_API_KEY"
            frameBorder="0" 
            allowFullScreen 
            aria-hidden="false" 
            
          ></iframe>
        </div>
      </section>

      {/* Fourth Section: Contact Numbers */}
      <section className="contact-numbers-section">
        <h2>Call Us on Our Local Lines</h2>
        <div className="contact-cards">
          <div className="contact-card">
            <i className="phone-icon"></i>
            <p className="contact-number">+1 (123) 456-7890</p>
          </div>
          <div className="contact-card">
            <i className="phone-icon"></i>
            <p className="contact-number">+1 (321) 654-0987</p>
          </div>
          <div className="contact-card">
            <i className="phone-icon"></i>
            <p className="contact-number">+1 (555) 123-4567</p>
          </div>
        </div>
      </section>

      {/* Fifth Section: Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-container" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <div className="testimonial-overlay">
                <p className="testimonial-text">"{testimonial.testimonial}"</p>
                <div className="testimonial-footer">
                  <span className="testimonial-name">{testimonial.name}</span>
                  <span className="testimonial-likes">
                    {/* <FaHeart style={{ color: 'red' }} /> {testimonial.likes} */}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="pause-button" onClick={togglePause}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      </section>
    </div>
  );
};

export default Contact;
