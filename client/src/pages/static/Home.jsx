import React, { useState } from 'react';
import './style.css';
import vid from '../../media/vid.mp4'
import { Link } from 'react-router-dom';

const Home = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <section className={`showcase ${isActive ? 'active' : ''}`}>
        <header>
          <h3 className="logo">Acountability</h3>
          <div className="toggle" onClick={toggleMenu}></div>
        </header>
        <video src={vid} muted loop autoPlay></video>
        <div className="overlay"></div>
        <div className="text">
          <h2>Achive Your Fitness Goal</h2>
          <h3>With Accountability Pro</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
         
			<Link to="/user/login">
				Get Started
			</Link>
		 
        </div>
        <ul className="social">
          <li>
            <a href="#">
              <img src="https://i.ibb.co/x7P24fL/facebook.png" alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="Instagram" />
            </a>
          </li>
        </ul>
      </section>
      <div className={`menu ${isActive ? 'active' : ''}`}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
