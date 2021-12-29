import React from "react";
import { Link } from "react-router-dom";

const AddNav = () => {
    return (
        <Link to="/create" className="nav-btn bt1">
            <i className="fas fa-plus"/>
        </Link>
    );
}

export default AddNav;