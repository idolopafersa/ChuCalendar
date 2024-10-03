const API_URL = 'http://localhost:8080/api'; // Replace with your actual API

export const fetchAllMeals = async () => {
  const response = await fetch(`${API_URL}/meal/getall`,{
    credentials:'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  return response.json();
};


export const fetchMeals = async (id) => {
  const response = await fetch(`${API_URL}/meal/get${id}`,{
    credentials:'include', 
  });
  if (!response.ok) {
    throw new Error('Failed to fetch meal');
  }
  return response.json();
};

// Delete a meal by ID
export const delMeal = async (id) => {
  const response = await fetch(`${API_URL}/meal/del${id}`, { 
    credentials: 'include', 
    method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete meal');
  }
};

// Modify a meal by ID
export const modifyMeal = async (meal) => {
  const response = await fetch(`${API_URL}/meal/put`, {
    method: 'PUT',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    throw new Error('Failed to modify meal');
  }
  return response.json();
};

// Create a new meal
export const createMeal = async (meal) => {
  const response = await fetch(`${API_URL}/meal/post`, {
    method: 'POST',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    throw new Error('Failed to create meal');
  }
  return response.json();
};
