import React from "react";

export default function Form({ label, form }) {
    
  return (
    
    <div className="d-flex justify-content-center">
      <div className="mb-3 col-5">
        <label htmlFor="formGroupExampleInput" className="form-label d-flex fw-semibold ps-2">{label}</label>
        <input type="text" className="form-control shadow-sm border border-dark-subtle rounded-4 py-3" id="formGroupExampleInput" placeholder={form} />
      </div>
    </div>
  );
}