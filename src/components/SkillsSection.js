import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // To add a remove icon

const SkillsSection = ({ skills, onChange }) => {
    const [newSkill, setNewSkill] = useState("");
    const [temporarySkills, setTemporarySkills] = useState(skills); // Start with existing skills

    const handleAddSkill = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (newSkill.trim()) {
                // Split the input by commas and map each skill to an object
                const skillsToAdd = newSkill
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill); // Remove any empty strings

                // Add the skills to the temporary list
                const updatedSkills = [...temporarySkills, ...skillsToAdd];

                setTemporarySkills(updatedSkills); // Update temporary skills list

                // Update the parent component's state with the new list of skills
                onChange("skills", null, null, updatedSkills);

                setNewSkill(""); // Clear the input field
            }
        }
    };

    const handleRemoveSkill = (index) => {
        // Remove skill from the temporary skills list
        const updatedSkills = temporarySkills.filter((_, i) => i !== index);
        setTemporarySkills(updatedSkills); // Update temporary skills list

        // Update parent state as well
        onChange("skills", null, null, updatedSkills);
    };

    const handleInputChange = (e) => {
        setNewSkill(e.target.value);
    };

    return (
        <div>
            <h2>Skills</h2>
            <div>
                <input
                    type="text"
                    value={newSkill}
                    onChange={handleInputChange}
                    onKeyDown={handleAddSkill}
                    placeholder="Type skills and press Enter or comma to add"
                    style={{
                        padding: "8px 10px",
                        marginBottom: "10px",
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            {/* Displaying the added skills */}
            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                {temporarySkills.map((skill, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#00A1D9",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            position: "relative",
                            fontSize: "14px",
                        }}
                    >
                        {skill}
                        <span
                            onClick={() => handleRemoveSkill(index)}
                            style={{
                                marginLeft: "8px",
                                cursor: "pointer",
                                color: "#fff",
                                fontSize: "16px",
                            }}
                        >
                            <FaTimes />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsSection;
