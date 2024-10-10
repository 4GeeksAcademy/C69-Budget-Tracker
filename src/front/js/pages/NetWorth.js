import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import BudgetPanel from '../component/budgetPanel';
import Header from "../component/header";
import CountUp from "react-countup";

export default function NetWorth() {
    const [welcome, setWelcome] = useState("");
    const [showAddAssetForm, setShowAddAssetForm] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [liabilitiesData, setLiabilitiesData] = useState({ total: 0, lastUpdated: null });
    const [assetsData, setAssetsData] = useState({ total: 0, lastUpdated: null });
    const { actions, store } = useContext(Context);
    

    useEffect(() => {
        console.log("fetch called")
        actions.fetchAssets();
    }, []);

    useEffect(() => {
        console.log("fetch called")
        actions.fetchLiabilities();
    }, []);

    useEffect(() => {
        const updateGreeting = () => {
            setWelcome(getGreeting());
        };

        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };

        const fetchLiabilities = async () => {
            try {
                const response = await fetch("/api/liabilities");
                if (response.ok) {
                    const liabilities = await response.json();
                    const total = liabilities.reduce((sum, liability) => sum + parseFloat(liability.amount), 0);
                    const lastUpdated = liabilities.reduce((latest, liability) => 
                        latest > new Date(liability.last_updated) ? latest : new Date(liability.last_updated),
                        new Date(0)
                    );
                    setLiabilitiesData({ total, lastUpdated });
                } else {
                    console.error("Failed to fetch liabilities");
                }
            } catch (error) {
                console.error("Error fetching liabilities:", error);
            }
        };

        const fetchAssets = async () => {
            try {
                const response = await fetch("/api/assets");
                if (response.ok) {
                    const assets = await response.json();
                    const total = assets.reduce((sum, asset) => sum + parseFloat(asset.amount), 0);
                    const lastUpdated = assets.reduce((latest, asset) => 
                        latest > new Date(asset.last_updated) ? latest : new Date(asset.last_updated),
                        new Date(0)
                    );
                    setAssetsData({ total, lastUpdated });
                } else {
                    console.error("Failed to fetch assets");
                }
            } catch (error) {
                console.error("Error fetching assets:", error);
            }
        };

        updateGreeting();
        updateTime();
        fetchLiabilities();
        fetchAssets();

        const intervalId = setInterval(() => {
            updateGreeting();
            updateTime();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const netWorth = assetsData.total - liabilitiesData.total;
    const netWorthLastUpdated = new Date(Math.max(
        assetsData.lastUpdated ? assetsData.lastUpdated.getTime() : 0,
        liabilitiesData.lastUpdated ? liabilitiesData.lastUpdated.getTime() : 0
    ));

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

    const formatDate = (date) => {
        return date ? date.toLocaleDateString() : 'N/A';
    };

    

    return (

        <div className="text-center">
            <Header welcome={welcome} name={"Mr. Kean!"} showBackButton={false} showAddButton={true} />
            <div className="mt-3" style={{ marginTop: '-25px' }}>
                <BudgetPanel title={"Net Worth"} total={formatCurrency(store.total_assets - store.total_liabilities)} lastUpdated={formatDate(netWorthLastUpdated)} />
                <BudgetPanel title={"Total Debt/Liabilities"} total={formatCurrency(store.total_liabilities)} lastUpdated={formatDate(liabilitiesData.lastUpdated)} edit={"edit/update"} name={"liabilities"} />
                <BudgetPanel title={"Total Assets/Income"} total={formatCurrency(store.total_assets)} lastUpdated={formatDate(assetsData.lastUpdated)} edit={"edit/update"} name={"assets"} />
            </div>
        </div>
    );
}