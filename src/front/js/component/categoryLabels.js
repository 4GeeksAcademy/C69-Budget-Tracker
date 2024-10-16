import React from "react";

export default function CategoryLabels(props) {

    return (
        
        <div className="bg-secondary-subtle border w-75 mx-auto m-2 py-2 border-light-subtle pe-6" style={{ paddingLeft: '15px', paddingRight: '200px'  }}>
            <div className="d-flex justify-content-between pb-1 fw-semibold">
                <div className="col-2">{props.category}</div>
                <div className="col-2">{props.description}</div>
                <div className="col-2">{props.amount}</div>
                <div className="col-2">{props.lastUpdated}</div>
            </div>
        </div>
    );
};