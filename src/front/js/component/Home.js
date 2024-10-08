import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import addIcon from '../../img/addicon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/home.css';

function Home() {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);
  const [greeting, setGreeting] = useState('');
  const dropdownRef = useRef(null);

  const handleShowAddOptions = () => setShowAddOptions(!showAddOptions);

  const handleAddAsset = () => {
    setShowAddOptions(false);
    setShowAddAssetForm(true);
  };

  const handleAddLiability = () => {
    console.log('Add liability clicked');
    setShowAddOptions(false);
  };

  const handleCloseAddAssetForm = () => {
    setShowAddAssetForm(false);
  };

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    updateGreeting(); // Initial call
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning,';
    if (hour < 18) return 'Good afternoon,';
    return 'Good evening,';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAddOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="Home">
      <Container className="px-5 px-md-4 px-lg-5">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <h2 className="text-2xl font-normal">{greeting} Garet!</h2>
          <div className="position-relative" ref={dropdownRef}>
            <button
              className="add-button btn rounded-circle p-0"
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                padding: 0
              }}
              onClick={handleShowAddOptions}
            >
              <img src={addIcon} alt="Add" style={{ width: '35px', height: '35px' }} />
            </button>
            {showAddOptions && (
              <div className="add-options-dropdown">
                <button className="dropdown-item" onClick={handleAddAsset}>Add asset</button>
                <button className="dropdown-item" onClick={handleAddLiability}>Add liability</button>
              </div>
            )}
          </div>
        </div>
        {/* You can add more content here if needed */}
      </Container>
      {showAddAssetForm && <AddAssetForm onClose={handleCloseAddAssetForm} />}
    </div>
  );
}

export default Home;