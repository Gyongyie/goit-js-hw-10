import axios from 'axios';

// Setăm cheia de API pentru toate cererile
axios.defaults.headers.common['x-api-key'] = 'cheia-ta-de-api'; // Înlocuiește cu cheia ta

// Funcția pentru a obține rasele de pisici
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
}

// Funcția pentru a obține informațiile detaliate despre pisică
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0]; // returnează primul rezultat
  } catch (error) {
    throw new Error('Failed to fetch cat data');
  }
}
