import React, {useState, useRef} from 'react';
import logo from './logo-light.png';
import './App.css';
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import MainTitle from "./components/MainTitle";
import Link from "./components/Link";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import MessageBox from "./components/MessageBox";
import Loader from "./components/Loader";


import services from "./utils/api-services";
import scroll from "./utils/scroll";
import Footer from "./components/Footer";

function App() {

    const initialEditMovie ={
        id: null,
        name: '',
        rating: 1,
        genre: '',
        explicit: false,
        cancelButton: false
    }

    const allMoviesRef = useRef('allMovies');
    const newMovieRef = useRef('newMovie');

    const [showMsg, setShowMsg] = useState(false);
    const [typeMsg, setTypeMsg] = useState(null);
    const [contentMsg, setContentMsg] = useState(null);

    const [showLoader, setShowLoader] = useState(true);

    const [moviesData, setMoviesData] = useState([]);
    const [editMovieData, setEditMovieData] = useState(initialEditMovie);


    React.useEffect(()=>{
        setShowLoader(true);
        services.getAll()
            .then((res)=>{
                setMoviesData(res.data);
                setShowLoader(false);
            }).catch((err)=>{
            if(err.response && err.response.status === 400){
                setContentMsg(err.response.data.message);
            }
            else if(err.response && err.response.status === 500){
                setContentMsg("Something went wrong, please try again.");
            }else{
                setContentMsg("Something went wrong, please try again.");
            }
            setTypeMsg('error');
            setShowLoader(false);
            setShowMsg(true);
        })
    }, [])

    const closeBoxHandler = ()=>{
        setShowMsg(false);
    }

    const handleSubmit = (e, id, data, resetForm)=>{
        e.preventDefault();
        if(id){
            setShowLoader(true);
            services.update(id, data).then(()=>{
                data.id = id;
                setTypeMsg('success');
                setContentMsg("Success!");
                setShowMsg(true);
                setMoviesData((preS)=>{
                   const preSF = preS.filter((movie)=>movie.id !== id);
                   return preSF.concat([data]);

                });
                setEditMovieData(initialEditMovie);
                setShowLoader(false);
            })
                .catch((err)=> {
                    if(err.response && err.response.status === 400){
                        setContentMsg(err.response.data.message);
                    }
                    else if(err.response && err.response.status === 500){
                        setContentMsg("Something went wrong, please try again.");
                    }else{
                        setContentMsg("Something went wrong, please try again.");
                    }
                    setTypeMsg('error');
                    setShowLoader(false);
                    setShowMsg(true);

                })
        } else{
            setShowLoader(true);
            services.create(data)
                .then((res)=>{
                    data.id = res.data[0];
                   setMoviesData((preS)=>preS.concat([data]));
                    resetForm();
                    setTypeMsg('success');
                    setContentMsg("Success!");
                    setShowMsg(true);
                    setShowLoader(false);
                })
                .catch((err)=> {
                    if(err.response && err.response.status === 400){
                        setContentMsg(err.response.data.message);
                    }
                    else if(err.response && err.response.status === 500){
                        setContentMsg("Something went wrong, please try again.");
                    }else{
                        setContentMsg("Something went wrong, please try again.");
                    }
                    setTypeMsg('error');
                    setShowLoader(false);
                    setShowMsg(true);

                })
        }

    }

    const handleCancel = (resetForm)=>{
        resetForm();
        setEditMovieData(initialEditMovie);
    }

    const editHandler = (movie)=>{
      setEditMovieData(movie);
      scroll(newMovieRef);
    }

    const deleteHandler = (id)=>{
        setShowLoader(true);
        services.remove(id)
            .then((res)=>{
                setTypeMsg('success');
                setShowMsg(true);
                setContentMsg("Success!");
                setMoviesData((preMovies)=>{
                    return preMovies.filter(movie=>movie.id !== id);
                });
                setShowLoader(false);
            })
            .catch((err)=>{
                if(err.response && err.response.status === 400){
                    setContentMsg(err.response.data.message);
                }
                else if(err.response && err.response.status === 500){
                    setContentMsg("Something went wrong, please try again.");
                }else{
                    setContentMsg("Something went wrong, please try again.");
                }
                setTypeMsg('error');
                setShowLoader(false);
                setShowMsg(true);
            })

    }

    return (
        <div className="App">
            <Header
                headerClasses={['header']}
            >
                <Navigation src={logo}>
                    <Link text="all movies" scrollTo={allMoviesRef}/>
                    <Link text="add new movie" scrollTo={newMovieRef} classesLi={['new-movie']}/>
                </Navigation>
                <MainTitle
                    title="Welcome to filmovisia"
                    subTitle="create / edit / view your movie collection"
                    subTitleClasses={['header-h4']}
                    wrapperClasses={['filmovisia-text-box']}
                />
            </Header>
            <section ref={newMovieRef} className="section-form">
                <MovieForm editMovie={editMovieData}  handleSubmit={handleSubmit} handleCancel={handleCancel}/>
            </section>
            <section ref={allMoviesRef} className="section-view-movies">
                <MovieList movies={moviesData} deleteHandler={deleteHandler} editHandler={editHandler}/>
            </section>
            <Footer/>

    <MessageBox show={showMsg} type={typeMsg} closeBoxHandler={closeBoxHandler} msg={contentMsg}/>
    <Loader show={showLoader}/>
        </div>
    );
}

export default App;
