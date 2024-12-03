import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Elementele HTML
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');
const catImage = document.getElementById('cat-image');
const catName = document.getElementById('cat-name');
const catDescription = document.getElementById('cat-description');
const catTemperament = document.getElementById('cat-temperament');

// Funcție pentru a încărca rasele de pisici în selector
async function loadBreeds() {
  try {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = `<option value="" disabled selected>Select a breed</option>`; // Resetăm opțiunile
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    showError();
  } finally {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  }
}

// Funcție pentru a obține informațiile despre pisică
async function loadCatInfo(breedId) {
  try {
    loader.style.display = 'block';
    catInfoDiv.style.display = 'none';
    const cat = await fetchCatByBreed(breedId);
    catImage.src = cat.url;
    catName.textContent = `Name: ${cat.breeds[0].name}`;
    catDescription.textContent = `Description: ${cat.breeds[0].description}`;
    catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
    catInfoDiv.style.display = 'block';
  } catch (err) {
    showError();
  } finally {
    loader.style.display = 'none';
  }
}

// Funcție pentru a arăta eroarea
function showError() {
  error.style.display = 'block';
  setTimeout(() => {
    error.style.display = 'none';
  }, 3000);
}

// Eveniment la schimbarea selecției rasei
breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  loadCatInfo(breedId);
});

// Inițializăm aplicația
loadBreeds();
