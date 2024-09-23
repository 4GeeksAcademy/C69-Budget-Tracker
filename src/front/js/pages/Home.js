import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(email, password)
        if (success) navigate("/dashboard"); 
    }
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                                <Link className="" to="/signup"><p className='text-center mt-4'>Click here to sign up</p></Link>
								<p className='text-center'>or</p>
								<Link to={"/forgotpassword"}><p className='text-center'>Forgot Password</p></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}