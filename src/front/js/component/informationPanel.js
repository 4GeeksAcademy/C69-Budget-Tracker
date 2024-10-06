import React from "react";

export default function InformationPanel(props) {

// COPY AND PASTE CODE BENEATH WHERE NEEDED   
//------>      <InformationPanel category={"n/a"} description={"n/a"} amount={"0.00"} lastUpdated={"n/a"} />


// Drop down menu needed for line 19 equipped with "edit" and "delete" funciton
    return (

        <div className="card w-75 mx-auto m-2 rounded-4 shadow-sm border-light-subtle">
            <div className="card-body d-flex justify-content-between px-3 pb-1" style={{ position: 'relative', top: '7px' }}>
                <div className="col-2">{props.category}</div>
                <div className="col-2 lh-1 text-truncate">{props.description}</div>
                <div className="col-2">${props.amount}</div>
                <div className="col-2">{props.lastUpdated}</div>
                <button type="button" className="col-1 btn btn-sm btn-light-subtle text-muted" style={{ position: 'relative', top: '-9px' }} data-bs-toggle="button"><h3><i class="fa-solid fa-ellipsis"></i></h3></button>
            </div>
        </div>
    );
};
