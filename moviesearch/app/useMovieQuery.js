import useSWR from 'swr'

export const useMovieQuery = (search) => {
    return useSWR(`movie-finder-${search}`, async () => {
      if (search.length < 3) {
        throw new Error("Please enter at least 3 characters");
      }
      const apiKey = localStorage.getItem("omdbApiKey");
      if (!localStorage.getItem("omdbApiKey")) {
        throw new Error("Missing OMDB API key");
      }
      const url = new URL("http://www.omdbapi.com");
        url.searchParams.set("s", search);
        url.searchParams.set("apiKey", apiKey);

    const json = await fetch(url.toString()).then((response) => response.json())
    return json;
});
}
  