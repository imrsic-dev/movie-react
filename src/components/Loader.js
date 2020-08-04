import React from "react";
import loaderSvg from '../img/loader.svg'

export default function Loader({show}) {
    return <div className="loader" hidden={!show} ><img src={loaderSvg} alt="loader"/></div>

}