

const getMovieVideos = async () => {


}


useEffect(() => {
    getMovieVideos()
    
},  [selectedMovieId]

const handleWatchTrailerButton = (id) => {
  setSelectedMovieId(id);
};

setMovieTrailer(data);
setTrailerLoading(false);

<div>
{selectedMovieId && !trailerLoading && <div>trailer loading</div>}</div>