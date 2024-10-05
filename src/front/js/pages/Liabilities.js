import React, { useContext } from "react";
import { Context } from "../store/appContext";
import InformationPanel from "../component/informationPanel";
import Header from "../component/header";
import CategoryLabels from "../component/categoryLabels";

export default function Liabilities() {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <Header back={<i class="fa-solid fa-chevron-left"></i>} page={"Liabilities"} />
            <CategoryLabels category={"Category"} description={"Description"} amount={"Amount"} lastUpdated={"Last Updated"} />
            <InformationPanel category={"Auto Loan"} description={"Wife's Lamborghini"} amount={"330,000.00"} lastUpdated={"1/13/2024"} />
            <InformationPanel category={"Mansion Loan"} description={"Loan for my gigantic mansion in California on the beach side"} amount={"5,330,000.00"} lastUpdated={"1/13/2024"} />
            <InformationPanel category={"401K"} description={"n/a"} amount={"1.00"} lastUpdated={"1/13/2024"} />
        </div>
    );
};