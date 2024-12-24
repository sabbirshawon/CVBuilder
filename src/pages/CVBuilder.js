import React, { useState } from "react";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import PersonalInfoSection from "../components/PersonalInfoSection";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const CVBuilder = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        education: [{}],
        experience: [{}],
        projects: [{}],
        skills: [], // Ensure skills is initialized as an array
    });

    const [isOpen, setIsOpen] = useState({
        personalInfo: true,
        education: false,
        experience: false,
        projects: false,
        skills: false,
    });

    const handleInputChange = (section, index, field, value) => {

        // Handle arrays (like skills) separately
        if (section === "skills") {
            // Convert the skills array into an array of objects with "name" property
            const skillsWithName = value.map((skill) => ({ name: skill }));

            console.log("section: ", section);
            console.log("skillsWithName: ", skillsWithName);
       
    
            setFormData((prevData) => ({
                ...prevData,
                skills: skillsWithName, // Update skills as an array of objects
            }));
        } else {
            // Ensure the section exists and is an array before updating it
            const updatedSection = Array.isArray(formData[section]) ? [...formData[section]] : [];
    
            if (index !== undefined && updatedSection[index]) {
                updatedSection[index][field] = value; // Modify the field value at the given index
            }
    
            console.log("updatedSection: ", updatedSection);
    
            setFormData((prevData) => ({
                ...prevData,
                [section]: updatedSection,
            }));
        }
    };
    
   
   
    const handlePersonalInfoChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleAddSection = (section) => {
        // Ensure the section exists and is an array before adding a new entry

        setFormData((prevData) => ({
            ...prevData,
            [section]: [...(prevData[section] || []), {}], // Ensure section exists and is an array
        }));
    };

    const toggleSection = (section) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/preview", { state: { formData } });
    };

    return (
        <div className="cv-builder">
            <h1>Build Your CV</h1>
            <p>Fill in the details below to create your professional CV.</p>

            {/* Personal Info Section */}
            <div className="section-header">
                <h2 onClick={() => toggleSection("personalInfo")}>
                    Personal Information
                </h2>
            </div>
            {isOpen.personalInfo && (
                <PersonalInfoSection
                    formData={formData}
                    onChange={handlePersonalInfoChange}
                />
            )}

            {/* Education Section */}
            <div className="section-header">
                <h2 onClick={() => toggleSection("education")}>Education</h2>
            </div>
            {isOpen.education && (
                <EducationSection
                    education={formData.education}
                    onChange={handleInputChange}
                    onAddSection={() => handleAddSection("education")}
                />
            )}

            {/* Experience Section */}
            <div className="section-header">
                <h2 onClick={() => toggleSection("experience")}>Work Experience</h2>
            </div>
            {isOpen.experience && (
                <ExperienceSection
                    experience={formData.experience}
                    onChange={handleInputChange}
                    onAddSection={() => handleAddSection("experience")}
                />
            )}

            {/* Projects Section */}
            <div className="section-header">
                <h2 onClick={() => toggleSection("projects")}>Projects</h2>
            </div>
            {isOpen.projects && (
                <ProjectsSection
                    projects={formData.projects}
                    onChange={handleInputChange}
                    onAddSection={() => handleAddSection("projects")}
                />
            )}

            {/* Skills Section */}
            <div className="section-header">
                <h2 onClick={() => toggleSection("skills")}>Skills</h2>
            </div>
            {isOpen.skills && (
                <SkillsSection
                    skills={formData.skills}
                    onChange={handleInputChange} // Pass onChange function
                    onAddSection={() => handleAddSection("skills")}
                />
            )}

            <button
                type="submit"
                onClick={handleSubmit}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "none",
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default CVBuilder;
