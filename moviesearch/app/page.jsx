"use client";
import { useQueryState } from "./UseQueryState";
import { useDebounceValue } from "./UseDebounceValue";
import { useRequiredApiKey } from "./useRequiredApiKey"; // Import correct du hook
import { useMovieQuery } from "./useMovieQuery";
// import {useState, useEffect} from "react";

export default function Home() {
  useRequiredApiKey();

  const [query, setQuery] = useQueryState("s", "");
  const debounceQuery = useDebounceValue(query, 500);
  const {data, error, isLoading} = useMovieQuery(debounceQuery);

  return (
    <div className="flex flex-col items-center pt-8">
      <header>
        <h1 className="text-2xl font-bold mb-4">Movie Finder</h1>
        <fieldset className="border input-bordered flex items-center gap-2">
          <legend>Search</legend>
          <label className="input input-bordered flex items-center gap-2">
            <input 
              type="text"
              className="grow"
              placeholder="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
          {debounceQuery}
        </fieldset>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <main>
          {error ? <p>Erro :  {error.message}</p> : null}
          <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (<p>Loading ...</p>) :null }
            {data?.Search?.length>0 ? data.Search.map((movie, index) => (
              <div key={index} className="border p-4 rounded">
                <h2 className="text-lg font-bold">{movie.Title}</h2>
                <div className="flex justify-center">
                <img src={movie.Poster} alt={movie.Title} />
                </div>
                <p>Year: {movie.Year}</p>
                <p>Type: {movie.Type}</p>
              </div>
            )) : null
            }
          </div>
        </main>
      </div>
    </div>
  );
}
