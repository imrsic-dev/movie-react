import React, {useState} from "react";
import MovieCard from "./MovieCard";

export default function MovieList ({movies, deleteHandler, editHandler}) {

        return(
            <React.Fragment>
            <div className="row view-movies-text-box">
                <h2>View your movie collection</h2>
                <h4>Here you can see a list of movies you added to your movie collection</h4>
            </div>
            <div className="row list-box">

                {movies ? movies.map((movie)=>{
                    return <MovieCard
                        key={movie.id}
                        id={movie.id}
                        name={movie.name}
                        genre={movie.genre}
                        explicit={movie.explicit}
                        rating={movie.rating}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                    />
                }): null}

            </div>
            </React.Fragment>
        )


}