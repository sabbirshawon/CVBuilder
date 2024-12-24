import React from "react";
import InputField from "./InputField";

const EducationSection = ({ education, onChange, onAddSection }) => {
    return (
        <div>
            <h2>Education</h2>
            {education.map((edu, index) => (
                <div key={index}>
                    <InputField
                        label="School/University"
                        value={edu.school || ""}
                        onChange={(e) =>
                            onChange("education", index, "school", e.target.value)
                        }
                    />
                    <InputField
                        label="Degree"
                        value={edu.degree || ""}
                        onChange={(e) =>
                            onChange("education", index, "degree", e.target.value)
                        }
                    />
                    <InputField
                        label="Year of Graduation"
                        value={edu.year || ""}
                        onChange={(e) =>
                            onChange("education", index, "year", e.target.value)
                        }
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={onAddSection}
                style={{ padding: "5px 10px", marginTop: "10px" }}
            >
                Add Another Education
            </button>
        </div>
    );
};

export default EducationSection;
