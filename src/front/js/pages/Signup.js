import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
 
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    text_notification: "",
    text_frequency: "",
  })
  // const [error, setError] = useState(null);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      const success = await actions.signUp({
        email: userData.email,
        password: userData.password,
        
        // TODO 

      });
      console.log(success)
      if (success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    }


  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    
                    value={userData.email}        
                    onChange={handleChange}
                    required
                    // add userData from above: Value:userData. / 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
