import React, { useEffect, useState } from "react";
import InformationPanel from "../component/informationPanel";
import Header from "../component/header";
import CategoryLabels from "../component/categoryLabels";

export default function Assets() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        console.log("fetch called")
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/get-asset`, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data, "data")
                setAssets(data);
            } else {
                console.error("Failed to fetch assets");
            }
        } catch (error) {
            console.error("Error fetching assets:", error);
        }
    };

    const addNewAsset = async () => {
        try {
            const response = await fetch("/api/assets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: "New Asset",
                    description: "Description",
                    amount: 0,
                }),
            });
            if (response.ok) {
                const newAsset = await response.json();
                setAssets([...assets, newAsset]);
            } else {
                console.error("Failed to add new asset");
            }
        } catch (error) {
            console.error("Error adding new asset:", error);
        }
    };

    return (
        <div className="text-center">
            <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Assets"} showBackButton={true} showAddButton={true} />
            <CategoryLabels category={"Category"} description={"Description"} amount={"Amount"} lastUpdated={"Last Updated"} />
            {assets.map((asset) => (
                <InformationPanel key={asset.id} category={asset.category} description={asset.description} amount={parseFloat(asset.amount).toFixed(2)} lastUpdated={new Date(asset.last_updated).toLocaleDateString()} /> ))}
        </div>
    );
}