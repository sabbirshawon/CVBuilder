// PersonalInfoSection.js: Personal Information Section Component

import React from "react";
import InputField from "./InputField";

const PersonalInfoSection = ({ formData, onChange }) => {
    return (
        <div>
            <h2>Personal Information</h2>
            <InputField
                label="Full Name"
                value={formData.name}
                onChange={(e) => onChange("name", e.target.value)}
            />
            <InputField
                label="Email"
                value={formData.email}
                onChange={(e) => onChange("email", e.target.value)}
            />
            <InputField
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => onChange("phone", e.target.value)}
            />
        </div>
    );
};

export default PersonalInfoSection;
