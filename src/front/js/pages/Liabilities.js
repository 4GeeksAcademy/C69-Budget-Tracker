import React, { useEffect, useState } from "react";
import InformationPanel from "../component/informationPanel";
import Header from "../component/header";
import CategoryLabels from "../component/categoryLabels";

export default function Liabilities() {
    const [liabilities, setLiabilities] = useState([]);

    useEffect(() => {
        fetchLiabilities();
    }, []);

    const fetchLiabilities = async () => {
        try {
            const response = await fetch("/api/liabilities");
            if (response.ok) {
                const data = await response.json();
                setLiabilities(data);
            } else {
                console.error("Failed to fetch liabilities");
            }
        } catch (error) {
            console.error("Error fetching liabilities:", error);
        }
    };

    const addNewLiability = async () => {
        try {
            const response = await fetch("/api/liabilities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: "New Liability",
                    description: "Description",
                    amount: 0,
                }),
            });
            if (response.ok) {
                const newLiability = await response.json();
                setLiabilities([...liabilities, newLiability]);
            } else {
                console.error("Failed to add new liability");
            }
        } catch (error) {
            console.error("Error adding new liability:", error);
        }
    };

    return (
        
        <div className="text-center">
            <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Liabilities"} showBackButton={true} showAddButton={true} />
            <CategoryLabels category={"Category"} description={"Description"} amount={"Amount"} lastUpdated={"Last Updated"} />
            {liabilities.map((liability) => (
                <InformationPanel key={liability.id} category={liability.category} description={liability.description} amount={parseFloat(liability.amount).toFixed(2)} lastUpdated={new Date(liability.last_updated).toLocaleDateString()} /> ))}
        </div>
    );
}