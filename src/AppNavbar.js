import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoRestaurantOutline } from 'react-icons/io5';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { RiHospitalLine } from 'react-icons/ri';
import { FiMapPin } from 'react-icons/fi';
import { GrContactInfo } from 'react-icons/gr';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu">
          <ul className="navbar-list navbar-list-center">
            <li className="navbar-item">
              <a className="navbar-link" href="/villes">
                <FiMapPin className="navbar-icon" />
                Ville
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/specialite">
                <FaHome className="navbar-icon" />
                specialite
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/serie">
                <IoRestaurantOutline className="navbar-icon" />
                serie
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/zone">
                <RiHospitalLine className="navbar-icon" />
                Zone
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/resto">
                <AiOutlineFileSearch className="navbar-icon" />
                Restaurant
              </a>
            </li>
            <li className="navbar-items">
              <Link to="/contact" className="navbar-link">
                <GrContactInfo className="navbar-icon" />
                Contact
              </Link>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
