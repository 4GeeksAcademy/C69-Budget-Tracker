import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import BudgetPanel from '../component/budgetPanel';
import Header from "../component/header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CountUp from "react-countup";

export default function NetWorth() {
    const { store, actions } = useContext(Context);
    const [welcome, setWelcome] = useState("");
    const [showAddAssetForm, setShowAddAssetForm] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [liabilitiesData, setLiabilitiesData] = useState({ total: 0, lastUpdated: null });
    const [assetsData, setAssetsData] = useState({ total: 0, lastUpdated: null });
    const [showChart, setShowChart] = useState(false);
    
    
    const calculateDuration = (amount) => {
        const baseDuration = 2;
        const additionalDuration = Math.log10(Math.abs(amount) + 10) / 2;
        return baseDuration + additionalDuration;
    };

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

    const generateDummyData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let netWorth = 500000; // Starting net worth
        return months.map(month => {
            netWorth += Math.floor(Math.random() * 50000) - 10000; // Random change between -10k and +40k
            return {
                month: month,
                netWorth: netWorth
            };
        });
    };

    const formatYAxis = (value) => {
        return `$${(value / 1000000).toFixed(1)}M`;
    };

    const formatTooltip = (value) => {
        return [`$${value.toLocaleString()}`, "Net Worth"];
    };

    return (
        <div className="text-center">
            <Header welcome={welcome} name={store.currentUser ? store.currentUser.username : "Guest"} showBackButton={false} showAddButton={true} />
            <div className="mt-3" style={{ marginTop: '-25px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: showChart ? '40%' : '100%' }}>
                    <div onClick={toggleChart} style={{ cursor: 'pointer' }}>
                        <BudgetPanel title={"Net Worth"} total={formatCurrency(store.total_assets - store.total_liabilities)} duration={calculateDuration(netWorth)} lastUpdated={formatDate(netWorthLastUpdated)} />
                    </div>
                    <BudgetPanel title={"Total Assets/Income"} total={formatCurrency(store.total_assets)} duration={calculateDuration(store.total_assets)} lastUpdated={formatDate(assetsData.lastUpdated)} edit={"edit/update"} name={"assets"} />
                    <BudgetPanel title={"Total Debt/Liabilities"} total={formatCurrency(store.total_liabilities)} duration={calculateDuration(store.total_liabilities)} lastUpdated={formatDate(liabilitiesData.lastUpdated)} edit={"edit/update"} name={"liabilities"} />
                </div>
                {showChart && (
                    <div style={{ width: '55%' }}>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={generateDummyData()}
                                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={formatYAxis} domain={[0, 1000000]} />
                                <Tooltip formatter={formatTooltip} />
                                <Legend />
                                <Bar dataKey="netWorth" fill="#8884d8" name="Net Worth" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}