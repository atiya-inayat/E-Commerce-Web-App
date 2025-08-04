const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchProduct(page = 1, limit = 12) {
  console.log("making request");
  try {
    const skip = (page - 1) * limit;
    const response = await fetch(`${apiUrl}?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error("failed to fetch products");
    const data = await response.json();
    console.log(data);
    // console.log(import.meta.env.VITE_API_URL); // ✅ Must log full API

    return data;
  } catch (error) {
    console.log(error, "error");
    // return { products: [] };
  }
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${apiUrl}/${id}`);
  console.log(res);

  return res.json();
};
