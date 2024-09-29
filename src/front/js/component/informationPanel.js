import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function InformationPanel(props) {
    const { store, actions } = useContext(Context);

// COPY AND PASTE CODE BENEATH WHERE NEEDED   
//------>      <InformationPanel category={"n/a"} description={"n/a"} amount={"0.00"} lastUpdated={"n/a"} />


// Drop down menu needed for line 19 equipped with "edit" and "delete" funciton
    return (
        <div className="card w-75 mx-auto m-3 py-2 rounded-3 shadow border-light-subtle">
            <div className="card-body d-flex justify-content-between ps-5 pb-1 pe-5">
                <div className="col-2">{props.category}</div>
                <div className="col-2">{props.description}</div>
                <div className="col-2">${props.amount}</div>
                <div className="col-2">{props.lastUpdated}</div>
                <h3 href="#" className="text-muted col-1"><i class="fa-solid fa-ellipsis"></i></h3>
            </div>
        </div>
    );
};
