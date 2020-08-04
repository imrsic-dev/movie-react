 const  scroll = (scrollToRef)=>{
    return window.scrollTo(0, scrollToRef.current.offsetTop)
};

export default scroll;