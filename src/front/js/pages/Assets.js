import React, { useContext } from "react";
import { Context } from "../store/appContext";
import InformationPanel from "../component/informationPanel";

export default function Assets() {
    const { store, actions } = useContext(Context);
//"Back" button and "Add New" button needed at the top of the screen

//Code needed to update each section with data input by user
    return (
        <div className="text-center mt-5">
            <InformationPanel category={"Savings Account"} description={"Citi Bank Savings Account"} amount={"1,000,000.00"} lastUpdated={"1/13/2024"} />
            <InformationPanel category={"Patent"} description={"Royalties"} amount={"50,000.00"} lastUpdated={"1/13/2024"} />
            <InformationPanel category={"Coding Company"} description={"Quarterly Profits"} amount={"5,330,000.00"} lastUpdated={"1/13/2024"} />
        </div>
    );
};