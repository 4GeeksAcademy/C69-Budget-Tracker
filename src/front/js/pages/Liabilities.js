import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import InformationPanel from "../component/informationPanel";
import Header from "../component/header";
import CategoryLabels from "../component/categoryLabels";


export default function Liabilities() {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        console.log("fetch called")
        actions.fetchLiabilities();
    }, []);

    const mostRecentDate = store.liabilities.reduce((latest, liabilities) => {
        const liabilitiesDate = new Date(liabilities.last_updated);
        return liabilitiesDate > latest ? liabilitiesDate : latest;
    }, new Date(0))

    // const addNewLiability = async () => {
    //     try {
    //         const response = await fetch("/api/liabilities", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 category: "New Liability",
    //                 description: "Description",
    //                 amount: 0,
    //             }),
    //         });
    //         if (response.ok) {
    //             const newLiability = await response.json();
    //             setLiabilities([...liabilities, newLiability]);
    //         } else {
    //             console.error("Failed to add new liability");
    //         }
    //     } catch (error) {
    //         console.error("Error adding new liability:", error);
    //     }
    // };

    return (
        <div className="text-center">
            <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Liabilities"} showBackButton={true} showAddButton={true} />
            <CategoryLabels category={"Category"} description={"Description"} amount={"Amount"} lastUpdated={"Last Updated"} />
            {store.liabilities.map((liability) => (
                <InformationPanel key={liability.id} category={liability.category} description={liability.description} amount={parseFloat(liability.amount).toFixed(2)} lastUpdated={new Date(liability.last_updated).toLocaleDateString()} />))}
        </div>
    );
}