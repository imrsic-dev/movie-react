import React from "react";

export default function Header ({headerClasses = [], children}) {
    return(
        <header className={headerClasses.join(' ')}>
            {children}
        </header>
    )
}