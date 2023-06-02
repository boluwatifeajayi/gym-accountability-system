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
          Welcome to Accountability Pro, your ultimate fitness companion. We are here to help you reach your fitness goals and stay accountable along the way. Whether you're a beginner or an experienced fitness enthusiast, our platform offers a wide range of workouts and resources to suit your needs.
          </p>
         
			<Link to="/workouts">
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/workouts">Workouts</Link>
          </li>
          <li>
            <Link to="/diets">Diets</Link>
          </li>
          <li>
            <Link to="/instructors">Session</Link>
          </li>
          <li>
            <Link to="/instructor/login">Instructors</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
