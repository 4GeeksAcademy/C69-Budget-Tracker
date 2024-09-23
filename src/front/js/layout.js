import React from "react";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/Home.js";
import Signup from "./pages/Signup.js"
import ForgotPassword from "./pages/ForgotPassword.js";
import Profile from "./pages/Profile.js";
import Dashboard from "./pages/Dashboard.js";
import Add from "./pages/Add.js";
import Edit from "./pages/Edit.js";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar>
                    <Routes>
                    
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<ForgotPassword />} path="/forgotpassword" />
                        <Route element={<Profile />} path="/profile" /> 
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Add />} path="/add" />
                        <Route element={<Edit />} path="/edit" />
                        
                    </Routes>
                    <Footer />
                    </Navbar>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
