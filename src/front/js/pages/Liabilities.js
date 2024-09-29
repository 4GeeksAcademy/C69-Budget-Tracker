import React, { useContext } from "react";
import { Context } from "../store/appContext";
import InformationPanel from "../component/informationPanel";

export default function Liabilities() {
    const { store, actions } = useContext(Context);
//"Back" button and "Add New" button needed at the top of the screen

//Code needed to update each section with data input by user
    return (
        <div className="text-center mt-5">
            <InformationPanel category={"Auto Loan"} description={"Wife's Lamborghini"} amount={"330,000.00"} lastUpdated={"1/13/2024"} />
            <InformationPanel category={"Mansion Loan"} description={"Loan for my gigantic mansion"} amount={"5,330,000.00"} lastUpdated={"1/13/2024"} />
        </div>
    );
};