import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import BudgetPanel from '../component/budgetPanel';
import Header from "../component/header";

export default function NetWorth() {
    const { store, actions } = useContext(Context);
    const [welcome, setWelcome] = useState("");
    const [showAddAssetForm, setShowAddAssetForm] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    const totalAssets = 6380000.00;
    const totalLiabilities = 5660000.00;
    const netWorth = totalAssets - totalLiabilities;

    useEffect(() => {
        const updateGreeting = () => {
            setWelcome(getGreeting());
        };

        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };

        updateGreeting(); // Initial call
        updateTime();
        const intervalId = setInterval(() => {
            updateGreeting();
            updateTime();
        }, 60000); // Update every minute
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good morning,";
        if (hour >= 12 && hour < 17) return "Good afternoon,";
        return "Good evening,";
    };

    const handleAddAsset = () => {
        setShowAddAssetForm(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="text-center">
            <Header welcome={welcome} name={"Mr. Kean!"} onAddAsset={handleAddAsset} />
            {showAddAssetForm && (<div className="mb-4">Add Asset Form Placeholder</div>)}
            <div style={{ marginTop: '-25px' }}>
                <BudgetPanel title={"Net Worth"} total={formatCurrency(netWorth)} lastUpdated={"n/a"} />
                <BudgetPanel title={"Total Debt/Liabilities"} total={formatCurrency(totalLiabilities)} lastUpdated={"n/a"} edit={"edit/update"} name={"liabilities"} />
                <BudgetPanel title={"Total Assets/Income"} total={formatCurrency(totalAssets)} lastUpdated={"n/a"} edit={"edit/update"} name={"assets"} />
            </div>
        </div>
    );
}