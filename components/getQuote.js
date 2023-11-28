export default async function getQuote() {
  const url = "https://api.kanye.rest/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
}
