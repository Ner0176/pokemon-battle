import api from "./axios-instance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const pokemonApi = {
  getList: async ({ limit, pageParam }) => {
    const response = await api.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${pageParam}`,
    );
    return response.data;
  },
  getAllTypes: async () => {
    const response = await api.get(`${BASE_URL}/type`);
    return response.data;
  },
  getPokemonByType: async ({ filterType }) => {
    const response = await api.get(`${BASE_URL}/type/${filterType}`);
    return response.data;
  },
  getPokemonDetails: async (id) => {
    const response = await api.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },
};
