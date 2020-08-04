import React from "react";

export default function  MainTitle ({title='', subTitle='', titleClasses=[], subTitleClasses=[], wrapperClasses=[]}) {
    return(
        <div className={wrapperClasses.join(' ')}>
            <h1 className={titleClasses.join(' ')}>{title}</h1>
            <h4 className={subTitleClasses.join(' ')}>{subTitle}</h4>
        </div>
    )
}