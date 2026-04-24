import axios from "axios";

const API_URL = "http://localhost:5000/api/bons";

export const createBon = async (data, token) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};