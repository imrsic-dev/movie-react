import React, {useState} from "react";
import {GiCancel} from 'react-icons/gi';

export default function MessageBox ({show, type, msg, closeBoxHandler}) {

    const [showBox, setShowBox] = useState(false)

    React.useEffect(()=>{
        let id;
        setShowBox(show);
        if(type === 'success'){
            id = window.setTimeout(()=>{
                closeBoxHandler();
            }, 500)
        }
        return ()=>{
            window.clearTimeout(id);
        }
    }, [show])

    if(type === 'error'){
        return(
            <div className="error-popup" hidden={!showBox}>
                Error: {msg}
              {/*  <ion-icon name="close-outline" className="popup-message-close"></ion-icon>*/}
                <GiCancel className="popup-message-close" onClick={closeBoxHandler}/>
            </div>
        )
    }
    else if(type === 'success'){
        return(
            <div className="success-popup" hidden={!showBox}>
                 {msg}
                <GiCancel className="popup-message-close" onClick={closeBoxHandler}/>
            </div>
        )
    }else {
        return null;
    }


}