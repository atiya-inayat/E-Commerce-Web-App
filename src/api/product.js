const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchProduct() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("failed to fetch products");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error, "error");
  }
}
