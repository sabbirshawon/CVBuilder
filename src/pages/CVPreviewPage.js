import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../styles/App.css";

const CVPreviewPage = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const cvRef = useRef();
    const downloadButtonRef = useRef();

    // Set state to handle the editable content
    const [editableContent, setEditableContent] = useState({
        name: formData?.name || "",
        email: formData?.email || "",
        phone: formData?.phone || "",
        education: formData?.education || [],
        experience: formData?.experience || [],
        projects: formData?.projects || [],
        skills: Array.isArray(formData?.skills) ? formData?.skills : [], // Ensure skills is always an array
    });

    if (!formData) {
        return <p className="no-data">No data available. Please go back and fill out the CV.</p>;
    }

    const {
        name,
        email,
        phone,
        education,
        experience,
        projects,
        skills,
    } = editableContent;

    const handleDownload = async () => {
        // Hide the download button before capturing
        downloadButtonRef.current.style.display = "none";
        
        const element = cvRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("CV.pdf");

        // Show the download button after capturing
        downloadButtonRef.current.style.display = "block";
    };

    const handleContentChange = (e, section, field, index) => {
        const newEditableContent = { ...editableContent };

        if (section === "education" || section === "experience" || section === "projects") {
            newEditableContent[section][index] = {
                ...newEditableContent[section][index],
                [field]: e.target.innerText,
            };
        } else if (section === "skills") {
            // Handle skills section to update name correctly
            const updatedSkills = [...newEditableContent.skills];
            updatedSkills[index] = { name: e.target.innerText };
            newEditableContent.skills = updatedSkills;
        } else {
            newEditableContent[section] = e.target.innerText;
        }

        setEditableContent(newEditableContent);
    };

    return (
        <div className="cv-preview-container" ref={cvRef}>
            <h1>CV Preview</h1>

            {/* Personal Information */}
            <section className="cv-preview-section">
                <h2>Personal Information</h2>
                <p
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => handleContentChange(e, "personalInfo", "name")}
                >
                    <strong>Name:</strong> {name}
                </p>
                <p
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => handleContentChange(e, "personalInfo", "email")}
                >
                    <strong>Email:</strong> {email}
                </p>
                <p
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => handleContentChange(e, "personalInfo", "phone")}
                >
                    <strong>Phone:</strong> {phone}
                </p>
            </section>

            {/* Education */}
            <section className="cv-preview-section">
                <h2>Education</h2>
                {education.length > 0 ? (
                    education.map((edu, index) => (
                        <div key={index}>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "education", "school", index)}
                            >
                                <strong>School/University:</strong> {edu?.school || "N/A"}
                            </p>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "education", "degree", index)}
                            >
                                <strong>Degree:</strong> {edu?.degree || "N/A"}
                            </p>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "education", "year", index)}
                            >
                                <strong>Year:</strong> {edu?.year || "N/A"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No education information available.</p>
                )}
            </section>

            {/* Work Experience */}
            <section className="cv-preview-section">
                <h2>Work Experience</h2>
                {experience.length > 0 ? (
                    experience.map((exp, index) => (
                        <div key={index}>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "experience", "company", index)}
                            >
                                <strong>Company:</strong> {exp?.company || "N/A"}
                            </p>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "experience", "role", index)}
                            >
                                <strong>Role:</strong> {exp?.role || "N/A"}
                            </p>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "experience", "startYear", index)}
                            >
                                <strong>Start Year:</strong> {exp?.startYear || "N/A"}
                            </p>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "experience", "endYear", index)}
                            >
                                <strong>End Year:</strong> {exp?.endYear || "N/A"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No work experience available.</p>
                )}
            </section>

            {/* Projects */}
            <section className="cv-preview-section">
                <h2>Projects</h2>
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={index}>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "projects", "title", index)}
                            >
                                <strong>Title:</strong> {project?.title || "N/A"}
                            </p>
                            <p
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "projects", "description", index)}
                            >
                                <strong>Description:</strong> {project?.description || "N/A"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No projects available.</p>
                )}
            </section>

            {/* Skills */}
            <section className="cv-preview-section">
                <h2>Skills</h2>
                {Array.isArray(skills) && skills.length > 0 ? (
                    <ul>
                        {skills.map((skill, index) => (
                            <li
                                key={index}
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => handleContentChange(e, "skills", "name", index)}
                            >
                                {skill?.name || "N/A"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data">No skills available.</p>
                )}
            </section>

            {/* Download Button */}
            <button
                className="download-button"
                ref={downloadButtonRef}
                onClick={handleDownload}
            >
                Download as PDF
            </button>
        </div>
    );
};

export default CVPreviewPage;
