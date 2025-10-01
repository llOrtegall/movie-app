import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const isFirtInput = useRef(true);

  useEffect(() => {
    if (isFirtInput.current) {
      isFirtInput.current = search === "";
      return
    }

    if (search === "") {
      setError("Please enter a search term");
      return
    }

    if (search.match(/^\d+$/)) {
      setError("Please enter a valid search term");
      return
    }

    if (search.length < 3) {
      setError("Please enter a valid search term");
      return
    }

    setError("")
  }, [search])

  return { search, error, setSearch }
}