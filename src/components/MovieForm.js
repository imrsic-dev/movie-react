import React, {useState, useEffect} from "react";

export default function MovieForm(props) {

    useEffect(()=>{
        const {id, name, genre, rating, explicit, cancelButton}=props.editMovie;
        setId(id)
        setName(name);
        setRating(rating);
        setGenre(genre);
        setExplicit(explicit);
        setCancelButton(cancelButton);
    }, [props.editMovie]);

   const [id, setId] = useState(null);
   const [name, setName] = useState('');
   const [genre, setGenre] = useState('');
   const [explicit, setExplicit] = useState(false);
   const [rating, setRating] = useState(1);
   const [cancelButton, setCancelButton] = useState(false);

    const resetForm = ()=>{
        setGenre('');
        setId(null);
        setExplicit(false);
        setName('');
        setRating(1);
    }

    return (
        <React.Fragment>
            <div className="row">
                <h2>Add new movie</h2>
                <h4>Create your favourite movies list, add your next movie to watch, etc...</h4>
            </div>
            <div className="container">
                <form onSubmit={(e)=>props.handleSubmit(e, id,{name, genre, rating, explicit}, resetForm)}>
                    <div>
                        <input
                            name="name"
                            type="text"
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            required
                            placeholder="Enter movie name*"/>
                    </div>
                    <div>
                        <input
                            name="genre"
                            type="text"
                            onChange={(e)=>setGenre(e.target.value)}
                            value={genre}
                            required
                            placeholder="Enter movie genre*"/>
                    </div>
                    <div>
                        <p className="p-form">
                            Rate this movie
                            <select
                                name="rating"
                                id="rate-movie-drpdwn"
                                value={rating}
                                onChange={(e)=>setRating(e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </p>
                    </div>
                    <p className="p-form p-form-2">
                        Is this movie explicit?
                        <label className="switch">
                            <input
                                name="explicit"
                                  onChange={(e)=>e.target.checked ? setExplicit(true): setExplicit(false)}   //
                                type="checkbox"
                                checked={explicit}/>
                                <span className="slider round"></span>
                        </label>
                    </p>
                    <div>
                        <button
                            type="submit"
                            className="button-add-new"
                        >
                            Save
                        </button>
                        <div className="button-cancel-wrapper" hidden={!cancelButton}>
                            <button
                                type="button"
                                className="button-cancel"
                            onClick={()=>props.handleCancel(resetForm)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>)
}