import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useSearchParams } from "react-router-dom";



export const ForgotPassword = () => {
    const { store } = useContext(Context);
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setErrMsg] = useState("");
    const [hasToken, setHasToken] = useState(false);
    let token = searchParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {setHasToken(true)}
    }, [token])

    async function handleSubmit(event) {
        event.preventDefault();
        if (!hasToken) {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/forgot-password", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ email: email.toLowerCase() })
                });
                if (response.ok) {
                    alert("An email has been sent to reset your password.")
                    navigate("/login")
                } else {
                    const data=await response.json();
                    setErrMsg(data.message || "Something went wrong")
                }
            }catch(error){
                setErrMsg(error.message)
            }
        }else{
            // reset password if you don't have a token.
        }
    }
// terniary if no token show email, if token show 2 password inputs. set up an error
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Reset Password</h2>
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
                               
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                                <Link className="" to="/signup"><p className='text-center mt-4'>Click here to sign up</p></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}