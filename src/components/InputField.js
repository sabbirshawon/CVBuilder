import React from "react";

const InputField = ({ label, value, onChange }) => {
    return (
        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    backgroundColor: "#f9f9f9",
                }}
            />
        </div>
    );
};

export default InputField;
