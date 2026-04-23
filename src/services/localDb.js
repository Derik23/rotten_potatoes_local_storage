const STORAGE_KEY = "movies_app_data";

const defaultData = {
  favorites: [],
  reviews: {},
  rating: {},
};

function getData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  } catch {
    return defaultData;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function toggleFavorite(movie) {
  const data = getData();

  const exists = data.favorites.find((m) => m.imdbID === movie.imdbID);

  if (exists) {
    data.favorites = data.favorites.filter((m) => m.imdbID !== movie.imdbID);
  } else {
    data.favorites.push(movie);
  }

  saveData(data);
}

export function getFavorites() {
  return getData().favorites;
}

export function getReviews(movieId) {
  const data = getData();
  return data.reviews[movieId] || [];
}

export function addReview(movieId, review) {
  const data = getData();

  if (!data.reviews[movieId]) {
    data.reviews[movieId] = [];
  }

  data.reviews[movieId].push(review);

  saveData(data);
}

export function deleteReview(movieId, reviewId) {
  const data = getData();

  data.reviews[movieId] = (data.reviews[movieId] || []).filter(
    (r) => r.id !== reviewId,
  );

  saveData(data);
}

export function saveRating(movieId, rating) {
  const data = getData();
  data.ratings[movieId] = rating;
  saveData(data);
}

export function getRating(movieId) {
  return getData().ratings[movieId] || 0;
}

export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
