import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div className="app">
                <AppNavbar />
                <Container fluid>
                    {/* Your content here */}
                </Container>
            </div>
        );
    }
}

export default Home;
