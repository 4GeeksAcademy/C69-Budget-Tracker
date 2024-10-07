import React from "react";

export default function CategoryLabels(props) {

    return (
        
        <div className="bg-light border border-light w-75 mx-auto m-2 py-2 border-light-subtle pe-6" style={{ paddingLeft: '1rem', paddingRight: '11rem'  }}>
            <div className="d-flex justify-content-between px-3 pb-1 fw-semibold">
                <div className="col-2">{props.category}</div>
                <div className="col-2">{props.description}</div>
                <div className="col-2">{props.amount}</div>
                <div className="col-2">{props.lastUpdated}</div>
            </div>
        </div>
    );
};