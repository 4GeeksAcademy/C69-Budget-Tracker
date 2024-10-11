import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import BudgetPanel from '../component/budgetPanel';
import Header from "../component/header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function NetWorth() {
    const [welcome, setWelcome] = useState("");
    const [showAddAssetForm, setShowAddAssetForm] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [liabilitiesData, setLiabilitiesData] = useState({ total: 0, lastUpdated: null });
    const [assetsData, setAssetsData] = useState({ total: 0, lastUpdated: null });
    const [showChart, setShowChart] = useState(false);
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

    const toggleChart = () => {
        setShowChart(!showChart);
    };

    const prepareChartData = () => {
        return [
            { name: 'Assets', value: store.total_assets },
            { name: 'Liabilities', value: store.total_liabilities },
            { name: 'Net Worth', value: store.total_assets - store.total_liabilities }
        ];
    };

    return (
        <div className="text-center">
            <Header welcome={welcome} name={"Mr. Kean!"} showBackButton={false} showAddButton={true} />
            <div className="mt-3" style={{ marginTop: '-25px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: showChart ? '40%' : '100%' }}>
                    <div onClick={toggleChart} style={{ cursor: 'pointer' }}>
                        <BudgetPanel title={"Net Worth"} total={formatCurrency(store.total_assets - store.total_liabilities)} lastUpdated={formatDate(netWorthLastUpdated)} />
                    </div>
                    <BudgetPanel title={"Total Debt/Liabilities"} total={formatCurrency(store.total_liabilities)} lastUpdated={formatDate(liabilitiesData.lastUpdated)} edit={"edit/update"} name={"liabilities"} />
                    <BudgetPanel title={"Total Assets/Income"} total={formatCurrency(store.total_assets)} lastUpdated={formatDate(assetsData.lastUpdated)} edit={"edit/update"} name={"assets"} />
                </div>
                {showChart && (
                    <div style={{ width: '55%' }}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={prepareChartData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}
