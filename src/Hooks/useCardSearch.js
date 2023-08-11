import { useState, useEffect } from "react";
import lodash from "lodash";

function useCardSearch(defaultValue, delay = 300) {
  const [term, setTerm] = useState(defaultValue);
  const [debouncedTerm, setDebouncedTerm] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [term, delay]);

  return [debouncedTerm, setTerm];
}

export default useCardSearch;
