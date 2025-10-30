import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const Genres = (props) => {
  const type = { props };

  const getGenre = async () => {
    const genreEndpoint = `${BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=${page}`;

    const response = await fetch(genreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setMovieData(data.results);

    setLoading(false);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  if (loading) {
    return <div>false</div>;
  }
};
export default Genres;
