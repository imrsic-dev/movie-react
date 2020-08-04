import React from "react";
import {AiFillStar} from 'react-icons/ai';
import movieIcon from '../img/movie-icon.png';

export default function MovieCard ({id, name, genre, rating, explicit, editHandler, deleteHandler}) {


    return(
        <div className="box">
            <img src={movieIcon} className="movie-icon" alt="movie icon"/>
                <div className="movie-feature">
                    <p className="p-movie-rating">
                        {rating}
                        <AiFillStar color='#F4C417' size={20}/>
                    </p>
                </div>
                <h3>{name}</h3>
                <div className="movie-feature">
                    <p className="p-movie-feature">{genre}</p>
                </div>
                <div className="movie-feature movie-explicit" hidden={!explicit}>
                    <p>18+</p>
                </div>
                <div className="movie-feature">
                    <button className="button-edit" onClick={()=>editHandler({id, name, genre, rating, explicit, cancelButton:true})}>edit</button>
                </div>
                <div className="movie-feature">
                    <button onClick={()=>deleteHandler(id)} className="button-delete">delete</button>
                </div>
        </div>
    )
}