import React from "react";
import scroll from "../utils/scroll";

export default function Link ({text, scrollTo, classesLi=[]}) {


    return(
            <li className={classesLi.join(' ')}>
                <a onClick={()=>{scroll(scrollTo)}}>
                    {text}
                </a>
            </li>


    )
}