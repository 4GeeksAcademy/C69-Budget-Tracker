import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';

export default function CategoryLabels(props) {
    const { store, actions } = useContext(Context);

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