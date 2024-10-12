import React from "react";

export default function Form({ label, form, type, showButton=false, buttonText, setValue, value, onButtonClick }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="mb-3 col-5">
        <label htmlFor="formGroupExampleInput" className="form-label d-flex fw-semibold ps-2">{label}</label>
        <input 
          type={type} 
          className="form-control shadow-sm border border-dark-subtle rounded-4 py-3" 
          onChange={(e) => setValue(e.target.value)} 
          value={value}
          id="formGroupExampleInput" 
          placeholder={form} 
        />
        {showButton && (
          <button 
            type="button" 
            className="btn btn-lg btn-secondary mt-5"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}        
      </div>
    </div>
  );
}
