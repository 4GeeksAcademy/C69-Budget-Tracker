import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function InformationPanel(props) {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionsClick = () => {
        setShowOptions(!showOptions);
    };

    const handleEditClick = () => {
        // Implement edit functionality
        console.log("Edit clicked");
        setShowOptions(false);
    };

    const handleDeleteClick = () => {
        // Implement delete functionality
        console.log("Delete clicked");
        setShowOptions(false);
    };

    return (
        <div className="card w-75 mx-auto m-2 rounded-4 shadow-sm border-light-subtle">
            <div className="card-body d-flex justify-content-between px-3 pb-1 ms-4" style={{ position: 'relative', top: '7px' }}>
                <div className="col-1 lh-1 text-truncate">{props.category}</div>
                <div className="col-1 lh-1 text-truncate">{props.description}</div>
                <div className="col-1 lh-1 text-truncate">${props.amount}</div>
                <div className="col-1">{props.lastUpdated}</div>
                <div ref={dropdownRef}>
                    <button 
                        type="button" 
                        className="col-1 btn btn-sm btn-light-subtle text-muted shadow-none" 
                        style={{ position: 'relative', top: '-9px', right: '50px' }} 
                        onClick={handleOptionsClick}
                    >
                        <h3><i className="fa-solid fa-ellipsis"></i></h3>
                    </button>
                    {showOptions && (
                        <div className="list-group mt-2 border border-light-subtle bg-white rounded-3 shadow fw-semibold text-muted" style={{
                            position: 'absolute',
                            top: '30px',
                            right: '65px',
                            width: '175px',
                            zIndex: 1000
                        }}>
                            <button onClick={handleEditClick} className="list-group-item list-group-item-action d-flex justify-content-beginning">
                                <i className="fa-solid fa-pen-to-square pt-1 me-3"></i> Edit
                            </button>
                            <button onClick={handleDeleteClick} className="list-group-item list-group-item-action d-flex justify-content-beginning">
                                <i className="fa-solid fa-trash pt-1 me-3"></i> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};