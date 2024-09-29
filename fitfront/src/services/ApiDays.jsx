const API_URL = 'http://localhost:8080/api'; // Adjust to your API

// Fetch the day data by date (includes routine_id and meals)
export const fetchDayByDate = async (date) => {
  const response = await fetch(`${API_URL}/day/get?date=${date}`, {
    credentials: 'include',
  });

  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch day data');
  }

  return response.json();
};


export const fetchRoutineById = async (routineId) => {
  const response = await fetch(`${API_URL}/routine/get?routine=${routineId}`, {
    credentials: 'include',
  });

  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch routine');
  }

  return response.json();
};

// Fetch exercises for a given routine
export const fetchExercisesForRoutine = async (routineId) => {
  const response = await fetch(`${API_URL}/exercises/routines/get?routine=${routineId}`, {
    credentials: 'include',
  });

  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch exercises for the routine');
  }

  return response.json();
};

// Add a new meal to the day
export const addMealToDay = async (date, meal) => {
  const response = await fetch(`${API_URL}/day/meal/post?date=${date}&&meal=${meal}` ,{
    method: 'POST',
    credentials: 'include',
   
   
  });

  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }

  if (!response.ok) {
    throw new Error('Failed to add meal to day');
  }

  return response.json();
};

// Delete a meal from the day
export const deleteMealFromDay = async (date, meal) => {
    const response = await fetch(`${API_URL}/day/meal/del?date=${date}&&meal=${meal}` ,{
        method: 'DELETE',
        credentials: 'include',
      });

  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }

  if (!response.ok) {
    throw new Error('Failed to delete meal from day');
  }
};

// Update the routine of the day
export const updateRoutineForDay = async (date, routine) => {
    
  const response = await fetch(`${API_URL}/day/routine/post?date=${date}&&routine=${routine}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status === 403 || response.status === 401) {
    localStorage.setItem('logged', 'false');
  }

  if (!response.ok) {
    throw new Error('Failed to update routine for day');
  }

  return response.json();
};
