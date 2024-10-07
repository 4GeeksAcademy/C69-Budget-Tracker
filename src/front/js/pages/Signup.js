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
    text_notification: false,
    text_frequency: "none",
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
    console.log("Password: ", userData.password);
    console.log("Confirm Password: ", userData.confirmPassword);


    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      const success = await actions.signUp({
        email: userData.email,
        password: userData.password,
        username: userData.username,
        phone: userData.phone,
        text_notification: userData.text_notification,
        text_frequency: userData.text_notification ? userData.text_frequency : "none"
        
        

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



               {/* Username Field */}
               <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                 {/* Phone Number Field */}
                 <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>



                  {/* Password fields */}
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

                {/* Text Notification Checkbox */}
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="text_notification"
                    name="text_notification"
                    checked={userData.text_notification}
                    onChange={handleChange}
                  />
                  <label htmlFor="text_notification" className="form-check-label">Receive Text Notifications</label>
                </div>

                {/* Text Frequency Radio Buttons */}
                {userData.text_notification && (
                  <div className="mb-3">
                    <label htmlFor="text_frequency" className="form-label">Text Frequency</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="weekly"
                          name="text_frequency"
                          value="weekly"
                          checked={userData.text_frequency === "weekly"}
                          onChange={handleChange}
                        />
                        <label htmlFor="weekly" className="form-check-label">Weekly</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="monthly"
                          name="text_frequency"
                          value="monthly"
                          checked={userData.text_frequency === "monthly"}
                          onChange={handleChange}
                        />
                        <label htmlFor="monthly" className="form-check-label">Monthly</label>
                      </div>
                    </div>
                  </div>
                )}




                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
