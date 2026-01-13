import api from "./axios-instance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const pokemonApi = {
  getList: async ({ pageParam }) => {
    const response = await api.get(
      `${BASE_URL}/pokemon?limit=20&offset=${pageParam}`
    );
    return response.data;
  },
  getPokemonDetails: async (id) => {
    const response = await api.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },
};
