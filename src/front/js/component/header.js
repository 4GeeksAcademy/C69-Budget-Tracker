import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Header({ welcome, name, back, page, showBackButton = false, showAddButton = false }) {

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
    navigate('/newasset');
    setShowAddOptions(false);
  };

  const handleAddLiabilityClick = () => {
    navigate('/newliability');
    setShowAddOptions(false);
  };

  return (
    
    <div className="App pt-3">
      <div className="container px-5 px-md-4 px-lg-5">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <div className="d-flex flex-column">

            {/* GREETING */}
            <h4 className="font-normal fw-semibold text-muted" style={{ position: 'relative', right: '35px' }}>{welcome} {name}</h4>

            <div className="d-flex align-items-center">
              
              {/* BACK BUTTON */}
              {showBackButton && (
                <span className="back-button" style={{ position: 'relative', top: '-15px', right: '80px' }}>
                  <button
                    className="btn rounded-circle fw-semibold text-muted shadow-none"
                    onClick={() => navigate(-1)}
                    style={buttonStyle}>
                    <h4>{back}</h4>
                  </button>
                </span>
              )}

              {/* PAGE TITLE */}
              <span className="page-title" style={{ position: 'relative', top: '-15px', right: '75px' }}>
                <h4 className="font-normal fw-semibold text-muted">{page}</h4>
              </span>

            </div>
          </div>

          {/* ADD NEW ASSET/LIABILITY BUTTON */}
          {showAddButton && (
            <div className="relative" ref={dropdownRef} style={{ position: 'relative', top: '-15px', right: '40px' }}>
              <button
                className="add-button btn rounded-circle text-muted shadow"
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
                  right: -75,
                  zIndex: 2
                }}><i className="fa-solid fa-plus shadow"></i>
              </button>

              {/* ADD NEW ASSET/LIABILITY DROPDOWN MENU */}
              {showAddOptions && (
                <div className="list-group mt-2 border border-light-subtle bg-white rounded-3 shadow fw-semibold text-muted" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '-60px',
                  width: '175px',
                  zIndex: 1000
                }}>
                  <button onClick={handleAddLiabilityClick} className="list-group-item list-group-item-action d-flex justify-content-beginning">
                    <i className="fa-solid fa-credit-card pt-1 me-3"></i> Add Liability
                  </button>
                  <button onClick={handleAddAssetClick} className="list-group-item list-group-item-action d-flex justify-content-beginning">
                    <i className="fa-solid fa-money-bills pt-1 me-3"></i> Add Asset
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}