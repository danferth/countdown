import { useState, useEffect } from "react";

const useQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const url = "https://type.fit/api/quotes";
    const config = {
      method: "get",
    };
    fetch(url, config)
      .then((response) => response.json())
      .then((data) => {
        const l = data.length;
        const d = Math.floor(Math.random() * Math.floor(l));
        setQuote(data[d]);
      });
  }, []);

  return quote;
};

export default useQuote;
