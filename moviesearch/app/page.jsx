"use client";
import { useQueryState } from "./UseQueryState";
import { useDebounceValue } from "./UseDebounceValue";
import { useRequiredApiKey } from "./useRequiredApiKey"; // Import correct du hook

// import {useState, useEffect} from "react";

export default function Home() {
  useRequiredApiKey();

  const [query, setQuery] = useQueryState("s", "");
  const debounceQuery = useDebounceValue(query, 500);

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
      </div>
    </div>
  );
}
