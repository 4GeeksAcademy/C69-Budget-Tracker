import React, { useContext } from "react";
import { Context } from "../store/appContext";
import BudgetPanel from '../component/budgetPanel';

export default function NetWorth() {
    const { store, actions } = useContext(Context);



    // you want to set up the budget part of the backend and fetch that information to populate this
    // but can't right now until we know more about the user functionality
    // when you get this styled move on to the edit/update component
    return (
        <div className="text-center mt-5">
            <BudgetPanel title={"Net Worth"} total={"720,000"} lastUpdated={"n/a"} />
            <BudgetPanel title={"Total Debt/Liabilities"} total={"5,660,000.00"} lastUpdated={"n/a"} edit={"edit/update"} name={"liabilities"} />
            <BudgetPanel title={"Total Assets/Income"} total={"6,380,000.00"} lastUpdated={"n/a"} edit={"edit/update"} name={"assets"} />
        </div>
    );
};