import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import InformationPanel from "../component/informationPanel";
import Header from "../component/header";
import CategoryLabels from "../component/categoryLabels";


export default function Assets() {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        console.log("fetch called")
        actions.fetchAssets();
    }, []);

    const mostRecentDate = store.assets.reduce((latest, asset) => {
        const assetDate = new Date(asset.last_updated);
        return assetDate > latest ? assetDate : latest;
    }, new Date(0))

    // const addNewAsset = async () => {
    //     try {
    //         const response = await fetch("/api/create-asset", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 category: "New Asset",
    //                 description: "Description",
    //                 amount: 0,
    //             }),
    //         });
    //         if (response.ok) {
    //             const newAsset = await response.json();
    //             setAssets([...assets, newAsset]);
    //         } else {
    //             console.error("Failed to add new asset");
    //         }
    //     } catch (error) {
    //         console.error("Error adding new asset:", error);
    //     }
    // };

    return (
        <div className="text-center">
            <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Assets"} showBackButton showAddButton />
            <CategoryLabels category={"Category"} description={"Description"} amount={"Amount"} lastUpdated={"Last Updated"} />
            {store.assets.map((asset) => (
                <InformationPanel key={asset.id} category={asset.category} description={asset.description} amount={parseFloat(asset.amount).toFixed(2)} lastUpdated={new Date(asset.last_updated).toLocaleDateString()} />))}
        </div>
    );
}