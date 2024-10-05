import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Header({ welcome, name, onAddAsset, back, page, add }) {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const buttonStyle = {
    outline: 'none',
    ':focus': {
      outline: 'none',
      boxShadow: 'none'
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAddOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddClick = () => {
    setShowAddOptions(!showAddOptions);
  };

  const handleAddAssetClick = () => {
    onAddAsset();
    setShowAddOptions(false);
  };

  return (
    <div className="App pt-3">
      <div className="container px-5 px-md-4 px-lg-5">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <div className="d-flex flex-column">
            <h4 className="font-normal fw-semibold text-muted" style={{ position: 'relative', right: '-40px' }}>{welcome} {name}</h4>
            <div className="d-flex align-items-center">
              <span className="back-button" style={{ position: 'relative', top: '-15px', right: '10px' }}>
                <button
                  className="btn rounded-circle fw-semibold text-muted"
                  onClick={() => navigate(-1)}
                  style={buttonStyle}>
                  <h4>{back}</h4>
                </button></span>
              <span className="page-title" style={{ position: 'relative', top: '-15px', right: '-3px' }}>
                <h4 className="font-normal fw-semibold text-muted">{page}</h4>
              </span>
            </div>
          </div>
          <div className="relative" ref={dropdownRef} style={{ position: 'relative', top: '-15px', right: '40px' }}>
            <button
              className="add-button btn rounded-circle text-muted"
              onClick={handleAddClick}
              style={{
                ...buttonStyle,
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "none",
                border: "2.5px solid",
                padding: 0,
                position: "absolute",
                top: -15,
                right: 0,
                zIndex: 2
              }}><i className="fa-solid fa-plus fw-bold"></i>
            </button>
            {showAddOptions && (
              <div className="mt-2 border border-light-subtle bg-white rounded-3 shadow fw-semibold text-muted" style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '0', 
                width: '175px', 
                zIndex: 1000 
              }}>
                <ul
                  onClick={handleAddAssetClick}
                  className="d-flex justify-content-beginning align-items-center block px-4 pt-3 text-sm hover:bg-white hover:bg-opacity-20 w-full text-left transition-all duration-300 cursor-pointer"
                >
                  <i class="fa-solid fa-money-bills me-3"></i> Add Asset
                </ul>
                <ul className="d-flex justify-content align-items-center block px-4 text-sm hover:bg-white hover:bg-opacity-20 w-full text-left transition-all duration-300 cursor-pointer">
                <i class="fa-solid fa-credit-card me-3"></i> Add Liability
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}