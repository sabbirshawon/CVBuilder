import React from "react";
import InputField from "./InputField";

const ExperienceSection = ({ experience, onChange, onAddSection }) => {
    return (
        <div>
            <h2>Work Experience</h2>
            {experience.map((exp, index) => (
                <div key={index}>
                    <InputField
                        label="Company Name"
                        value={exp.company || ""}
                        onChange={(e) =>
                            onChange("experience", index, "company", e.target.value)
                        }
                    />
                    <InputField
                        label="Role"
                        value={exp.role || ""}
                        onChange={(e) =>
                            onChange("experience", index, "role", e.target.value)
                        }
                    />
                    <InputField
                        label="Year Started"
                        value={exp.startYear || ""}
                        onChange={(e) =>
                            onChange("experience", index, "startYear", e.target.value)
                        }
                    />
                    <InputField
                        label="Year Ended (or Current)"
                        value={exp.endYear || ""}
                        onChange={(e) =>
                            onChange("experience", index, "endYear", e.target.value)
                        }
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={onAddSection}
                style={{ padding: "5px 10px", marginTop: "10px" }}
            >
                Add Another Experience
            </button>
        </div>
    );
};

export default ExperienceSection;
