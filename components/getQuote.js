export default async function getQuote() {
  const url = "https://api.kanye.rest/";

  const responce = await fetch(url);
  const data = await responce.json();

  return data;
}
