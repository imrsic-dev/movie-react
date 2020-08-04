import React from "react";

export default function Navigation ({src, children}) {
    return(
        <nav>
            <div className="row">
                <img src={src} alt="logo" className="logo"/>
                    <ul className="main-nav">
                        {children}
                    </ul>
            </div>
        </nav>
    )
}