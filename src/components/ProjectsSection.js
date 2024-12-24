import React from "react";
import InputField from "./InputField";

const ProjectsSection = ({ projects, onChange, onAddSection }) => {
    return (
        <div>
            <h2>Projects</h2>
            {projects.map((project, index) => (
                <div key={index}>
                    <InputField
                        label="Project Title"
                        value={project.title || ""}
                        onChange={(e) =>
                            onChange("projects", index, "title", e.target.value)
                        }
                    />
                    <InputField
                        label="Project Description"
                        value={project.description || ""}
                        onChange={(e) =>
                            onChange("projects", index, "description", e.target.value)
                        }
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={onAddSection}
                style={{ padding: "5px 10px", marginTop: "10px" }}
            >
                Add Another Project
            </button>
        </div>
    );
};

export default ProjectsSection;
