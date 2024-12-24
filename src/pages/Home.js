// Home.js: Home Page Component

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Welcome to the CV Builder</h1>
            <p>Create your professional CV with ease. Start by adding your details.</p>
            <Link 
                to="/builder" 
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontSize: "16px"
                }}
            >
                Get Started
            </Link>
        </div>
    );
};

export default Home;
