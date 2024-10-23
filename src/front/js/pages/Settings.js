import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState(store.currentUser?.username || "");
    const [phone, setPhone] = useState(store.currentUser?.phone || "");
    const [textNotification, setTextNotification] = useState(store.currentUserPreferences?.text_notification || false);
    const [textFrequency, setTextFrequency] = useState(store.currentUserPreferences?.text_frequency || "none");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (!store.currentUser) {
            actions.loadUserInfo();
        } else {
            setUsername(store.currentUser.username || "");
            setPhone(store.currentUser.phone || "");
            setTextNotification(store.currentUserPreferences?.text_notification || false);
            setTextFrequency(store.currentUserPreferences?.text_frequency || "none");
        }
    }, [store.currentUser, store.currentUserPreferences]);

    const handleSaveUserInfo = async () => {
        const success = await actions.editUserInfo({
            username: username,
            phone: phone,
            text_notification: textNotification,
            text_frequency: textNotification ? textFrequency : "none"
        });

        if (success) {
            alert("Settings updated successfully!");
        } else {
            alert("Failed to update settings. Please try again.");
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        const success = await actions.changePassword({
            currentPassword: currentPassword,
            newPassword: newPassword
        });

        if (success) {
            alert("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            alert("Failed to change password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Settings</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={textNotification}
                        onChange={(e) => setTextNotification(e.target.checked)}
                    />
                    <label className="form-check-label">Text Notifications</label>
                </div>
                {textNotification && (
                    <div className="mb-3">
                        <label className="form-label">Text Frequency</label>
                        <select
                            className="form-select"
                            value={textFrequency}
                            onChange={(e) => setTextFrequency(e.target.value)}
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                )}
                <button type="button" className="btn btn-primary w-100" onClick={handleSaveUserInfo}>
                    Save Settings
                </button>
            </form>

            <h3 className="mt-5">Change Password</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-danger w-100" onClick={handleChangePassword}>
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Settings;
