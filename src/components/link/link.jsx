import { Link as ReactLink } from "react-router-dom";
import React from "react";

const Link = ({ label, to, href, ...props }) => {
    return (
        <>
            {
                href &&
                <a href={href} className="nav-link" {...props}>
                    {label}
                </a>
            }
            {
                !href &&
                <ReactLink to={to} className="nav-link" {...props}>
                    {label}
                </ReactLink>
            }
        </>
    );
};

export default Link;
