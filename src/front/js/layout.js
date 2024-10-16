import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { ForgotPassword } from "./pages/ForgotPassword.js";
import Home from "./component/Home.js";

import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Dashboard from "./pages/dashboard.js";
import NetWorth from "./pages/NetWorth.js";
import Liabilities from "./pages/Liabilities.js";
import Assets from "./pages/Assets.js";
import injectContext from "./store/appContext";
import NewLiability from "./pages/NewLiability.js";
import NewAsset from "./pages/NewAsset.js";

import { NavbarComponent } from "./component/navbar";

import Settings from "./pages/Settings";
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarComponent />
                    <Routes>
                        <Route element={<Home />} path="/Home" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        {/* <Route element={<NetWorth />} path="/networth" /> */}
                        <Route element={<NetWorth />} path="/" />
                        <Route element={<Liabilities />} path="/liabilities" />
                        <Route element={<NewLiability />} path="/newliability" />
                        <Route element={<Assets />} path="/assets" />
                        <Route element={<NewAsset />} path="/newasset" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<Settings />} path="/settings" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
