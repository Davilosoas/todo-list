import axios from "axios";

export const fetchRandomQuote = async () => {
  const res = await axios.get("http://api.quotable.io/random");
  return res.data;
};

export const translateText = async (text) => {
  const res = await axios.get("https://clients5.google.com/translate_a/t", {
    params: {
      client: "dict-chrome-ex",
      sl: "auto",
      tl: "pt",
      q: text,
    },
  });

  return res.data?.[0][0] || text;
};
