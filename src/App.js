import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CVBuilder from "./pages/CVBuilder";
import CVPreviewPage from "./pages/CVPreviewPage";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<CVBuilder />} />
            <Route path="/preview" element={<CVPreviewPage />} />
        </Routes>
    </Router>
);

export default App;
