import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

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
        // Load user info when the component mounts
        if (!store.currentUser) {
            actions.loadUserInfo();
        }
    }, []);

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
        <div>
            <h2>Settings</h2>
            <form>
                <div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Text Notifications</label>
                    <input 
                        type="checkbox" 
                        checked={textNotification} 
                        onChange={(e) => setTextNotification(e.target.checked)} 
                    />
                </div>
                {textNotification && (
                    <div>
                        <label>Text Frequency</label>
                        <select 
                            value={textFrequency} 
                            onChange={(e) => setTextFrequency(e.target.value)}>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                )}
                <button type="button" onClick={handleSaveUserInfo}>
                    Save Settings
                </button>
            </form>

            <h3>Change Password</h3>
            <form>
                <div>
                    <label>Current Password</label>
                    <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Confirm New Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
                <button type="button" onClick={handleChangePassword}>
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Settings;
